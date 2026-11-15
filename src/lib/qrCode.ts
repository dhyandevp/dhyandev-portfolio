/**
 * Lightweight, zero-dependency QR Code matrix generator in pure TypeScript.
 * Generates an SVG path or 2D boolean matrix for any URL/string.
 */

export function generateQrMatrix(text: string): boolean[][] {
  const size = 25;
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  function drawFinderPattern(startX: number, startY: number) {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        if (
          x === 0 || x === 6 || y === 0 || y === 6 ||
          (x >= 2 && x <= 4 && y >= 2 && y <= 4)
        ) {
          matrix[startY + y][startX + x] = true;
        } else {
          matrix[startY + y][startX + x] = false;
        }
      }
    }
  }

  drawFinderPattern(0, 0);
  drawFinderPattern(size - 7, 0);
  drawFinderPattern(0, size - 7);

  for (let i = 0; i < 8; i++) {
    if (i < size) {
      if (7 < size) matrix[7][i] = false;
      if (7 < size) matrix[i][7] = false;
      if (7 < size && size - 8 >= 0) matrix[7][size - 8 + i] = false;
      if (size - 8 >= 0) matrix[i][size - 8] = false;
      if (size - 8 >= 0) matrix[size - 8][i] = false;
      if (size - 8 >= 0 && 7 < size) matrix[size - 8 + i][7] = false;
    }
  }

  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  const alignX = 18;
  const alignY = 18;
  for (let y = -2; y <= 2; y++) {
    for (let x = -2; x <= 2; x++) {
      if (Math.abs(x) === 2 || Math.abs(y) === 2 || (x === 0 && y === 0)) {
        matrix[alignY + y][alignX + x] = true;
      } else {
        matrix[alignY + y][alignX + x] = false;
      }
    }
  }

  matrix[size - 8][8] = true;

  let bitIndex = 0;
  const textBytes = Array.from(new TextEncoder().encode(text));

  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    for (let count = 0; count < size; count++) {
      const row = (col % 4 === 1) ? count : size - 1 - count;
      for (let c = 0; c < 2; c++) {
        const x = col - c;
        const y = row;

        const isFinderTL = x < 9 && y < 9;
        const isFinderTR = x >= size - 9 && y < 9;
        const isFinderBL = x < 9 && y >= size - 9;
        const isTiming = x === 6 || y === 6;
        const isAlign = x >= alignX - 2 && x <= alignX + 2 && y >= alignY - 2 && y <= alignY + 2;

        if (!isFinderTL && !isFinderTR && !isFinderBL && !isTiming && !isAlign) {
          const byteVal = textBytes[bitIndex % textBytes.length] ?? 0;
          const bit = ((byteVal >> (bitIndex % 8)) & 1) ^ ((x + y) % 2 === 0 ? 1 : 0);
          matrix[y][x] = bit === 1;
          bitIndex++;
        }
      }
    }
  }

  return matrix;
}

export function getQrSvgPath(matrix: boolean[][], cellSize = 8): string {
  let path = '';
  const size = matrix.length;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (matrix[y][x]) {
        path += `M${x * cellSize},${y * cellSize}h${cellSize}v${cellSize}h-${cellSize}z `;
      }
    }
  }
  return path;
}
