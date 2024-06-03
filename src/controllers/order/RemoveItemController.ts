import { Request, Response } from 'express';
import { RemoveItemService } from '../../services/order/RemoveItemService';

class RemoveItemController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { orderId, itemId } = req.params;
        const service = new RemoveItemService();

        try {
            const result = await service.execute({ orderId, itemId });
            if (result.error) {
                return res.status(result.status || 500).json({ message: result.message });
            }
            return res.status(200).json({ message: 'Item removido do pedido com sucesso', item: result.item });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao remover item do pedido';
            return res.status(500).json({ message: errorMessage });
        }
    }
}

export { RemoveItemController };
