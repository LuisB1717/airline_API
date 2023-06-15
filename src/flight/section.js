/**
 * Create a section instance.
 * @param {Array<string>} columns Column letters
 * @param {number} rows Number of rows
 * @returns {Array} Section bidimensional array
 */
export function createSection(columns, rows, startIndex = 1, seats) {
  const section = [];

  for (let index = startIndex; index < startIndex + rows; index++) {
    section.push(
      columns.map((letter) => {
        const seat = seats.find(
          (seat) =>
            seat.airplane_id == 1 &&
            seat.seat_column == letter &&
            seat.seat_row == index
        );
        return {
          seat: {
            id: seat?.seat_id,
            row: index,
            column: letter,
            type: seat?.seat_type_id,
          },
        };
      })
    );
  }

  return section;
}
