interface Tree {
  id: number;
  pid: number;
  nameCn: string;
  nameEn: string;
  children: Tree[];
}

// interface Dict {
//   code: string;
//   nameCn: string;
//   nameEn: string;
// }

export function toNameCn(value: string, dict: any) {
  value = value + '';
  if (Array.isArray(dict)) {
    const item = dict.find((item) => item.code === value);
    return item ? item.nameCn : value;
  } else if (dict instanceof Object && dict[value]) {
    return dict[value].nameCn || value;
  } else {
    return '';
  }
}

export function toNameEn(value: string, dict: any) {
  value = value + '';
  if (Array.isArray(dict)) {
    const item = dict.find((item) => item.code === value);
    return item ? item.nameEn : value;
  } else if (dict instanceof Object && dict[value]) {
    return dict[value].nameEn || value;
  } else {
    return '';
  }
}

// export function toArrayNameEn(value: string, dictList: Dict[]) {
//   if (dictList) {
//     const item = dictList.find((item) => item.code === value);
//     return item ? item.nameEn : value;
//   } else {
//     return '';
//   }
// }

// export function toArrayNameEn(value: string, dictList: Dict[]) {
//   if (dictList) {
//     const item = dictList.find((item) => item.code === value);
//     return item ? item.nameEn : value;
//   } else {
//     return '';
//   }
// }

export function toTreeNameCn(id: number, treeList: Tree[]) {
  const treePath: Tree[] = [];
  if (treeList) {
    for (const tree of treeList) {
      if (findTreePath(tree, treePath, id)) {
        treePath.push(tree);
        break;
      }
    }
  }
  return treePath.map((tree) => tree.nameCn).reverse();
}

function findTreePath(tree: Tree, path: Tree[], id: number): boolean {
  if (tree.id === id) {
    return true;
  } else if (!tree.children) {
    return false;
  } else {
    for (const childTree of tree.children) {
      const found = findTreePath(childTree, path, id);
      if (found) {
        path.push(childTree);
        return found;
      }
    }
  }
  return false;
}
