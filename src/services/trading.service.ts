import { prisma } from '../config/database';
import { marketService } from './market.service';
import { AppError } from '../utils/errors';
import { Trade, Position, Portfolio } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

interface TradeOrder {
  portfolioId: string;
  symbol: string;
  tradeType: 'buy' | 'sell';
  assetType: 'stock' | 'etf' | 'option';
  quantity: number;
  orderType: 'market' | 'limit';
  limitPrice?: number;
}

class TradingService {
  async executeTrade(userId: string, order: TradeOrder): Promise<Trade> {
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id: order.portfolioId,
        userId: userId,
        isActive: true
      }
    });

    if (!portfolio) {
      throw new AppError('Portfolio not found or inactive', 404);
    }

    // Get current market price
    const marketData = await marketService.getQuote(order.symbol);
    const executionPrice = order.orderType === 'limit' && order.limitPrice
      ? order.limitPrice
      : marketData.price;

    // Calculate total cost
    const totalCost = executionPrice * order.quantity;
    const commission = this.calculateCommission(order);
    const totalWithCommission = totalCost + commission;

    // Validate trade
    if (order.tradeType === 'buy') {
      if (portfolio.currentBalance.toNumber() < totalWithCommission) {
        throw new AppError('Insufficient funds', 400);
      }
    } else {
      // Check if user has position to sell
      const position = await prisma.position.findUnique({
        where: {
          portfolioId_symbol: {
            portfolioId: order.portfolioId,
            symbol: order.symbol
          }
        }
      });

      if (!position || position.quantity < order.quantity) {
        throw new AppError('Insufficient shares to sell', 400);
      }
    }

    // Execute trade in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create trade record
      const trade = await tx.trade.create({
        data: {
          portfolioId: order.portfolioId,
          symbol: order.symbol,
          tradeType: order.tradeType,
          assetType: order.assetType,
          quantity: order.quantity,
          price: executionPrice,
          commission: commission
        }
      });

      // Update portfolio balance
      const balanceChange = order.tradeType === 'buy' 
        ? -totalWithCommission 
        : totalCost - commission;

      await tx.portfolio.update({
        where: { id: order.portfolioId },
        data: {
          currentBalance: {
            increment: balanceChange
          }
        }
      });

      // Update or create position
      await this.updatePosition(tx, order, executionPrice);

      return trade;
    });

    // Send real-time update via WebSocket
    await this.broadcastPortfolioUpdate(userId, portfolio.id);

    return result;
  }

  async getPortfolio(userId: string, portfolioId: string): Promise<any> {
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id: portfolioId,
        userId: userId
      },
      include: {
        positions: true,
        trades: {
          orderBy: { executedAt: 'desc' },
          take: 50
        }
      }
    });

    if (!portfolio) {
      throw new AppError('Portfolio not found', 404);
    }

    // Update current prices and calculate P&L
    const updatedPositions = await Promise.all(
      portfolio.positions.map(async (position) => {
        const marketData = await marketService.getQuote(position.symbol);
        const currentValue = marketData.price * position.quantity;
        const costBasis = position.averageCost.toNumber() * position.quantity;
        const pnl = currentValue - costBasis;
        const pnlPercentage = (pnl / costBasis) * 100;

        await prisma.position.update({
          where: { id: position.id },
          data: {
            currentPrice: marketData.price,
            pnl: pnl
          }
        });

        return {
          ...position,
          currentPrice: marketData.price,
          currentValue,
          pnl,
          pnlPercentage
        };
      })
    );

    // Calculate total portfolio value
    const totalPositionsValue = updatedPositions.reduce(
      (sum, pos) => sum + pos.currentValue,
      0
    );
    const totalPortfolioValue = portfolio.currentBalance.toNumber() + totalPositionsValue;
    const totalPnL = totalPortfolioValue - portfolio.initialBalance.toNumber();
    const totalPnLPercentage = (totalPnL / portfolio.initialBalance.toNumber()) * 100;

    return {
      ...portfolio,
      positions: updatedPositions,
      totalPortfolioValue,
      totalPnL,
      totalPnLPercentage
    };
  }

  async createPortfolio(userId: string, name: string, initialBalance: number = 100000): Promise<Portfolio> {
    const existingActive = await prisma.portfolio.findFirst({
      where: {
        userId,
        isActive: true
      }
    });

    if (existingActive) {
      throw new AppError('You already have an active portfolio', 400);
    }

    return prisma.portfolio.create({
      data: {
        userId,
        name,
        initialBalance,
        currentBalance: initialBalance
      }
    });
  }

  private calculateCommission(order: TradeOrder): number {
    // Simple commission structure
    if (order.assetType === 'option') {
      return 0.65 * order.quantity; // Per contract
    }
    return 0; // Free stock/ETF trades
  }

  private async updatePosition(tx: any, order: TradeOrder, executionPrice: number): Promise<void> {
    const existingPosition = await tx.position.findUnique({
      where: {
        portfolioId_symbol: {
          portfolioId: order.portfolioId,
          symbol: order.symbol
        }
      }
    });

    if (order.tradeType === 'buy') {
      if (existingPosition) {
        // Update existing position
        const newQuantity = existingPosition.quantity + order.quantity;
        const newTotalCost = 
          (existingPosition.averageCost.toNumber() * existingPosition.quantity) +
          (executionPrice * order.quantity);
        const newAverageCost = newTotalCost / newQuantity;

        await tx.position.update({
          where: { id: existingPosition.id },
          data: {
            quantity: newQuantity,
            averageCost: newAverageCost
          }
        });
      } else {
        // Create new position
        await tx.position.create({
          data: {
            portfolioId: order.portfolioId,
            symbol: order.symbol,
            assetType: order.assetType,
            quantity: order.quantity,
            averageCost: executionPrice
          }
        });
      }
    } else {
      // Sell trade
      const newQuantity = existingPosition!.quantity - order.quantity;
      
      if (newQuantity === 0) {
        await tx.position.delete({
          where: { id: existingPosition!.id }
        });
      } else {
        await tx.position.update({
          where: { id: existingPosition!.id },
          data: { quantity: newQuantity }
        });
      }
    }
  }

  private async broadcastPortfolioUpdate(userId: string, portfolioId: string): Promise<void> {
    // Implementation depends on WebSocket setup
    // This would emit real-time updates to connected clients
  }
}

export const tradingService = new TradingService();