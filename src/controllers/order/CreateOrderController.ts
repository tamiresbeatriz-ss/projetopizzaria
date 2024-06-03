import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/order/CreateOrderService';

class CreateOrderController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { mesa, nome } = req.body;
        const service = new CreateOrderService();

        try {
            const order = await service.execute({ mesa, nome });
            return res.json({ order });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro desconhecido ao criar pedido';
            return res.status(500).json({ message });
        }
    }
}

export { CreateOrderController };
