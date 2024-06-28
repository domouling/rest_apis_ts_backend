import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ],
    });
    res.json({
        data: products
    });
}


export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({
            error: `Producto con ID ${ id } no encontrado`
        });
        return;
    }

    res.json({
        data: product
    });
}


export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const product = await Product.create(req.body);
    res.status(201).json({
        data: product
    });
}


export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({
            error: `Producto con ID ${ id } no encontrado`
        });
        return;
    }

    // Actualizar el producto
    await product.update(req.body);
    await product.save();

    res.json({
        data: product,
    })
}


export const updateAvialibility = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({
            error: `Producto con ID ${ id } no encontrado`
        });
        return;
    }

    // Actualizar el producto
    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({
        data: product,
    })
}


export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(404).json({
            error: `Producto con ID ${ id } no encontrado`
        });
        return;
    }

    // Eliminar el producto
    await product.destroy();
    res.json({
        data: 'Producto eliminado'
    })
}