import { Request, Response } from 'express';
import { RemoveOrderService } from '../../services/order/RemoveOrderService';

class RemoveOrderController {
    async handle(req: Request, res: Response): Promise<Response> {
        const orderId = req.query.id_pedido as string;
        const service = new RemoveOrderService();

        try {
            const result = await service.execute({ orderId });
            return res.status(200).json({ message: 'Pedido removido com sucesso', order: result });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao remover o pedido';
            return res.status(500).json({ message: 'Erro ao remover o pedido', error: errorMessage });
        }
    }
}

export { RemoveOrderController };
