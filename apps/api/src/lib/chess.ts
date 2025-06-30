export class ChessHandler {
  constructor() {}
  move() {}
}

export type Color = 'w' | 'b';

export const WHITE = 'w';
export const BLACK = 'b';

export const PAWN = 'p';
export const KNIGHT = 'n';
export const BISHOP = 'b';
export const ROOK = 'r';
export const QUEEN = 'q';
export const KING = 'k';

type PiecesSymbol = 'p' | 'n' | 'r' | 'q' | 'k' | 'b';

type Board = (Piece | null)[][];

export function initializeBoard(): Board {
  return [
    [
      { type: 'rook', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'queen', color: 'black' },
      { type: 'king', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'rook', color: 'black' },
    ],

    Array(8).fill({ type: 'pawn', color: 'black' }),

    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),

    Array(8).fill({ type: 'pawn', color: 'white' }),

    [
      { type: 'rook', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'queen', color: 'white' },
      { type: 'king', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'rook', color: 'white' },
    ],
  ];
}

// prettier-ignore
export type Square =
    'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8' |
    'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' |
    'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' |
    'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' |
    'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' |
    'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' |
    'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' |
    'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1'

export type Piece = {
  color: Color;
  type: PiecesSymbol;
};

type InternalMove = {
  color: Color;
  from: Position;
  to: Position;
  piece: PiecesSymbol;
  captured?: PiecesSymbol;
  promotion?: PiecesSymbol;
  flags: number;
};

type SelectPiece = {
  color: Color;
  from: Position;
  piece: PiecesSymbol;
};

type Position = { x: number; y: number };

export class Move {
  color: Color;
  from: Position;
  to: Position;
  piece: PiecesSymbol;
  captured?: PiecesSymbol;
  promotion?: PiecesSymbol;
  flags: number;
  board: Board;
  moveHandler: Record<PiecesSymbol, () => void> = {
    p: this.pawnMove,
    n: this.knightMove,
    r: this.rookMove,
    q: this.queenMove,
    k: this.kingMove,
    b: this.bishopMove,
  };

  constructor(board: Board, internalMove: InternalMove) {
    const { color, flags, from, to, captured, promotion, piece } = internalMove;

    this.board = board;
    this.color = color;
    this.to = to;
    this.from = from;
    this.piece = piece;
    this.captured = captured;
    this.promotion = promotion;
    this.flags = flags;
  }

  validateMove(internalMove: InternalMove): boolean {
    return true;
  }

  pawnMove() {}

  knightMove() {}

  rookMove() {}

  kingMove() {}

  bishopMove() {}

  queenMove() {}

  getMovesByPiece(selectPiece: SelectPiece): Position[] {
    const { color, piece, from } = selectPiece;

    return [];
  }
}
