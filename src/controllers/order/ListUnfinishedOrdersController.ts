import { Request, Response } from "express";
import { ListUnfinishedOrdersService } from "../../services/order/ListUnfinishedOrdersService";

class ListUnfinishedOrdersController {
    async handle(req: Request, res: Response): Promise<Response> {
        const service = new ListUnfinishedOrdersService();

        try {
            const orders = await service.execute();
            return res.status(200).json({ orders });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao listar pedidos não finalizados';
            return res.status(500).json({ message: 'Erro ao listar pedidos não finalizados', error: errorMessage });
        }
    }
}

export { ListUnfinishedOrdersController };
