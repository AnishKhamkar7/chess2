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

const pawnDir = {
  w: -1,
  b: 1,
};

const rookDir = [
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
];

const bishopDir = [
  { dx: 1, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: -1, dy: -1 },
  { dx: -1, dy: 1 },
];

const queenDir = [
  { dx: 1, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: -1, dy: -1 },
  { dx: -1, dy: 1 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
];

const kingDir = [
  { dx: 1, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: -1, dy: -1 },
  { dx: -1, dy: 1 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
];

const knightDir = [
  { dx: 2, dy: 1 },
  { dx: 2, dy: -1 },
  { dx: -2, dy: 1 },
  { dx: -2, dy: -1 },
  { dx: 1, dy: 2 },
  { dx: 1, dy: -2 },
  { dx: -1, dy: 2 },
  { dx: -1, dy: -2 },
];

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

const Bits = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 3,
  EP_CAPTURE: 4,
  PROMOTION: 5,
  KSIDE_CASTLE: 6,
  QSIDE_CASTLE: 7,
  NULL_MOVE: 8,
  CHECK: 9,
} as const;

type BitFlag = (typeof Bits)[keyof typeof Bits];

type Position = {
  x: number;
  y: number;
};

type PiecePositions = {
  target: null | { x1: number; y1: number; x2: number; y2: number };
  x: number;
  y: number;
  flags: BitFlag;
};

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
}

export function getMovesByPiece(
  board: Board,
  selectPiece: SelectPiece,
  isCheck: boolean,
): PiecePositions[] {
  const { color, piece, from } = selectPiece;
  const { x, y } = from;

  const moves: PiecePositions[] = [];

  switch (piece) {
    case 'p':
      const startRow = color === 'w' ? 6 : 1;

      const oneY = y + pawnDir[color];
      if (isInside(x, oneY) && board[oneY][x] === null) {
        moves.push({ x, y: oneY, target: null, flags: Bits.NORMAL });

        const twoY = y + pawnDir[color] * 2;
        if (y === startRow && board[twoY][x] === null) {
          moves.push({ x, y: twoY, target: null, flags: Bits.NORMAL });
        }
      }

      for (let dx of [-1, 1]) {
        const cx = x + dx;
        const cy = y + pawnDir[color];
        if (isInside(cx, cy)) {
          const target = board[cy][cx];
          if (target && target.color !== color) {
            target.type !== 'k'
              ? moves.push({
                  x: cx,
                  y: cy,
                  target: { x1: x, y1: y, x2: cx, y2: cy },
                  flags: Bits.CAPTURE,
                })
              : moves.push({
                  x: cx,
                  y: cy,
                  target: { x1: x, y1: y, x2: cx, y2: cy },
                  flags: Bits.CHECK,
                });
          }
        }
      }

      return moves;

    case 'r':
      for (const { dx, dy } of rookDir) {
        let cx = x + dx;
        let cy = y + dy;

        while (isInside(cx, cy)) {
          const target = board[cy][cx];
          if (target === null) {
            moves.push({ x: cx, y: cy, target: null, flags: Bits.NORMAL });
          } else if (target.color !== color) {
            target.type !== 'k'
              ? moves.push({
                  x: cx,
                  y: cy,
                  target: { x1: x, y1: y, x2: cx, y2: cy },
                  flags: Bits.CAPTURE,
                })
              : moves.push({
                  x: cx,
                  y: cy,
                  target: { x1: x, y1: y, x2: cx, y2: cy },
                  flags: Bits.CHECK,
                });
          } else {
            break;
          }

          cx += dx;
          cy += dy;
        }
      }

      return moves;

    case 'b':
      for (const { dx, dy } of bishopDir) {
        let cx = x + dx;
        let cy = y + dy;

        while (isInside(cx, cy)) {
          const target = board[cy][cx];

          if (target === null) {
            moves.push({ x: cx, y: cy, target: null, flags: Bits.NORMAL });
          } else if (target.color !== color) {
            target.type !== 'k'
              ? moves.push({
                  x: cx,
                  y: cy,
                  target: { x1: x, y1: y, x2: cx, y2: cy },
                  flags: Bits.CAPTURE,
                })
              : moves.push({
                  x: cx,
                  y: cy,
                  target: { x1: x, y1: y, x2: cx, y2: cy },
                  flags: Bits.CHECK,
                });
          } else break;

          cx += dx;
          cy += dy;
        }
      }

      return moves;

    case 'q':
      for (const { dx, dy } of queenDir) {
        let cx = x + dx;
        let cy = y + dy;

        while (isInside(cx, cy)) {
          const target = board[cy][cx];

          if (target === null) {
            moves.push({ x: cx, y: cy, target: null, flags: Bits.NORMAL });
          } else if (target.color !== color) {
            target.type !== 'k'
              ? moves.push({
                  x: cx,
                  y: cy,
                  target: { x1: x, y1: y, x2: cx, y2: cy },
                  flags: Bits.CAPTURE,
                })
              : moves.push({
                  x: cx,
                  y: cy,
                  target: { x1: x, y1: y, x2: cx, y2: cy },
                  flags: Bits.CHECK,
                });
          } else break;

          cx += dx;
          cy += dy;
        }
      }

    case 'k':
      for (const { dx, dy } of kingDir) {
        const cx = x + dx;
        const cy = y + dy;

        if (isInside(cx, cy)) {
          const target = board[cy][cx];

          if (target === null) {
            moves.push({ x: cx, y: cy, target: null, flags: Bits.NORMAL });
          } else if (target.color !== color) {
            moves.push({
              x: cx,
              y: cy,
              target: { x1: x, y1: y, x2: cx, y2: cy },
              flags: Bits.CAPTURE,
            });
          }
        }
      }
    case 'n':
      for (const { dx, dy } of knightDir) {
        const cx = x + dx;
        const cy = y + dy;

        if (isInside(cx, cy)) {
          const target = board[cy][cx];

          if (target === null) {
            moves.push({ x: cx, y: cy, target: null, flags: Bits.NORMAL });
          } else if (target.color !== color) {
            target.type !== 'k'
              ? moves.push({
                  x: cx,
                  y: cy,
                  target: { x1: x, y1: y, x2: cx, y2: cy },
                  flags: Bits.CAPTURE,
                })
              : moves.push({
                  x: cx,
                  y: cy,
                  target: { x1: x, y1: y, x2: cx, y2: cy },
                  flags: Bits.CHECK,
                });
          }
        }
      }
      return moves;
    default:
      break;
  }

  return moves;
}

type Moves = { [key: string]: PiecePositions[] };

export function getAllMovesByColor(board: Board, color: Color): Moves {
  const allMoves: Moves = {};

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = board[y][x];

      if (piece && piece.color === color) {
        const selectPiece: SelectPiece = {
          color: piece.color,
          piece: piece.type,
          from: { x, y },
        };

        const moves = getMovesByPiece(board, selectPiece, false);

        if (moves.length > 0) {
          allMoves[`${x},${y}`] = moves;
        }
      }
    }
  }
  return allMoves;
}

function isInside(x: number, y: number) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

type BoardPosition = { x: number; y: number; notation: string };

const positionBoard: BoardPosition[][] = [
  [
    // y = 0 → rank 8
    { x: 0, y: 0, notation: 'a8' },
    { x: 1, y: 0, notation: 'b8' },
    { x: 2, y: 0, notation: 'c8' },
    { x: 3, y: 0, notation: 'd8' },
    { x: 4, y: 0, notation: 'e8' },
    { x: 5, y: 0, notation: 'f8' },
    { x: 6, y: 0, notation: 'g8' },
    { x: 7, y: 0, notation: 'h8' },
  ],
  [
    // y = 1 → rank 7
    { x: 0, y: 1, notation: 'a7' },
    { x: 1, y: 1, notation: 'b7' },
    { x: 2, y: 1, notation: 'c7' },
    { x: 3, y: 1, notation: 'd7' },
    { x: 4, y: 1, notation: 'e7' },
    { x: 5, y: 1, notation: 'f7' },
    { x: 6, y: 1, notation: 'g7' },
    { x: 7, y: 1, notation: 'h7' },
  ],
  [
    // y = 2 → rank 6
    { x: 0, y: 2, notation: 'a6' },
    { x: 1, y: 2, notation: 'b6' },
    { x: 2, y: 2, notation: 'c6' },
    { x: 3, y: 2, notation: 'd6' },
    { x: 4, y: 2, notation: 'e6' },
    { x: 5, y: 2, notation: 'f6' },
    { x: 6, y: 2, notation: 'g6' },
    { x: 7, y: 2, notation: 'h6' },
  ],
  [
    // y = 3 → rank 5
    { x: 0, y: 3, notation: 'a5' },
    { x: 1, y: 3, notation: 'b5' },
    { x: 2, y: 3, notation: 'c5' },
    { x: 3, y: 3, notation: 'd5' },
    { x: 4, y: 3, notation: 'e5' },
    { x: 5, y: 3, notation: 'f5' },
    { x: 6, y: 3, notation: 'g5' },
    { x: 7, y: 3, notation: 'h5' },
  ],
  [
    // y = 4 → rank 4
    { x: 0, y: 4, notation: 'a4' },
    { x: 1, y: 4, notation: 'b4' },
    { x: 2, y: 4, notation: 'c4' },
    { x: 3, y: 4, notation: 'd4' },
    { x: 4, y: 4, notation: 'e4' },
    { x: 5, y: 4, notation: 'f4' },
    { x: 6, y: 4, notation: 'g4' },
    { x: 7, y: 4, notation: 'h4' },
  ],
  [
    // y = 5 → rank 3
    { x: 0, y: 5, notation: 'a3' },
    { x: 1, y: 5, notation: 'b3' },
    { x: 2, y: 5, notation: 'c3' },
    { x: 3, y: 5, notation: 'd3' },
    { x: 4, y: 5, notation: 'e3' },
    { x: 5, y: 5, notation: 'f3' },
    { x: 6, y: 5, notation: 'g3' },
    { x: 7, y: 5, notation: 'h3' },
  ],
  [
    // y = 6 → rank 2
    { x: 0, y: 6, notation: 'a2' },
    { x: 1, y: 6, notation: 'b2' },
    { x: 2, y: 6, notation: 'c2' },
    { x: 3, y: 6, notation: 'd2' },
    { x: 4, y: 6, notation: 'e2' },
    { x: 5, y: 6, notation: 'f2' },
    { x: 6, y: 6, notation: 'g2' },
    { x: 7, y: 6, notation: 'h2' },
  ],
  [
    // y = 7 → rank 1
    { x: 0, y: 7, notation: 'a1' },
    { x: 1, y: 7, notation: 'b1' },
    { x: 2, y: 7, notation: 'c1' },
    { x: 3, y: 7, notation: 'd1' },
    { x: 4, y: 7, notation: 'e1' },
    { x: 5, y: 7, notation: 'f1' },
    { x: 6, y: 7, notation: 'g1' },
    { x: 7, y: 7, notation: 'h1' },
  ],
];
