import { categories } from "../types/Category";
import { Note } from "../types/Note";

export function createInfoArray(active: Note[], archived: Note[]) {
  const infoArray = [];

  for (const category of categories) {
    infoArray.push({ category: category, activeCount: 0, archivedCount: 0 });
  }

  infoArray.map((infoRow) => {
    infoRow.activeCount = active.filter((note) => note.category === infoRow.category).length;
    infoRow.archivedCount = archived.filter((note) => note.category === infoRow.category).length;
  });

  return infoArray;
}
