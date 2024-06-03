import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { nome, preco, descricao, id_categoria } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'O caminho do banner precisa ser informado!' });
        }

        const { filename: banner } = req.file;
        const createProductService = new CreateProductService();

        try {
            const product = await createProductService.execute({ nome, preco, descricao, banner, id_categoria });
            return res.status(201).json({ message: 'Produto criado com sucesso', product });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao criar produto';
            console.error("Erro ao criar produto:", errorMessage);
            return res.status(500).json({ message: 'Erro ao criar produto', error: errorMessage });
        }
    }
}

export { CreateProductController };
