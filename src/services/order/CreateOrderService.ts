import prismaClient from "../../prisma";

interface OrderRequest {
    mesa: number;
    nome: string;
}

class CreateOrderService {
    async execute({ mesa, nome }: OrderRequest) {
        if (!mesa) {
            throw new Error('O número da mesa precisa ser informado!');
        }

        if (!nome) {
            throw new Error('O nome do cliente precisa ser informado!');
        }

        const order = await prismaClient.pedido.create({
            data: {
                mesa,
                nome
            }
        });

        return order;
    }
}

export { CreateOrderService };
