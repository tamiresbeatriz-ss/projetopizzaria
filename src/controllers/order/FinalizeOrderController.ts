import { Request, Response } from 'express';
import { FinalizeOrderService } from '../../services/order/FinalizeOrderService';

class FinalizeOrderController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { orderId } = req.params;
        const service = new FinalizeOrderService();

        try {
            const result = await service.execute(orderId);
            return res.status(200).json(result);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro desconhecido ao finalizar pedido';
            return res.status(400).json({ message });
        }
    }
}

export { FinalizeOrderController };
