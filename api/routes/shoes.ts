import express from 'express';
import type { Request, Response } from 'express';
import { getAllShoes, getShoeById, getAllEras, getAllStyles } from '../services/shoeService.js';

const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  const { era, style } = req.query;
  const shoes = getAllShoes(era as string, style as string);
  res.json(shoes);
});

router.get('/eras', (_req: Request, res: Response): void => {
  const eras = getAllEras();
  res.json(eras);
});

router.get('/styles', (_req: Request, res: Response): void => {
  const styles = getAllStyles();
  res.json(styles);
});

router.get('/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const shoe = getShoeById(id);

  if (!shoe) {
    res.status(404).json({
      success: false,
      error: 'Shoe not found',
    });
    return;
  }

  res.json(shoe);
});

export default router;
