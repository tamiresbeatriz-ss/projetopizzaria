import { Request, Response } from 'express';
import { SendOrderService } from '../../services/order/SendOrderService';

class SendOrderController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { order_id: orderId } = req.body;
        const service = new SendOrderService();

        try {
            const result = await service.execute({ orderId });
            return res.status(200).json({ message: 'Pedido enviado com sucesso', order: result });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao enviar o pedido';
            return res.status(500).json({ message: 'Erro ao enviar o pedido', error: errorMessage });
        }
    }
}

export { SendOrderController };
