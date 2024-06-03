import { Request, Response } from "express";
import { ListFinishedOrdersService } from "../../services/order/ListFinishedOrdersService";

class ListFinishedOrdersController {
    async handle(req: Request, res: Response): Promise<Response> {
        const service = new ListFinishedOrdersService();

        try {
            const orders = await service.execute();
            return res.status(200).json({ orders });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao listar pedidos finalizados';
            return res.status(500).json({ message: 'Erro ao listar pedidos finalizados', error: errorMessage });
        }
    }
}

export { ListFinishedOrdersController };
