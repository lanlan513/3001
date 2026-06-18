import express from 'express';
import type { Request, Response } from 'express';
import {
  getAllShoes,
  getShoeById,
  getAllEras,
  getAllStyles,
  getAllColors,
  getHeelHeightRange,
} from '../services/shoeService.js';

const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  const { era, style, color, minHeelHeight, maxHeelHeight, search } = req.query;
  const shoes = getAllShoes(
    era as string,
    style as string,
    color as string,
    minHeelHeight as string,
    maxHeelHeight as string,
    search as string
  );
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

router.get('/colors', (_req: Request, res: Response): void => {
  const colors = getAllColors();
  res.json(colors);
});

router.get('/heel-height-range', (_req: Request, res: Response): void => {
  const range = getHeelHeightRange();
  res.json(range);
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
