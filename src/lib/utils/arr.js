export const groupBy = (field, arr, asTuple = false) => {
  const res = arr.reduce((acc, it) => {
    const g = it[field].trim()
    const a = acc[g] || []
    return { ...acc, [g]: a.concat(it) }
  }, {})

  return asTuple ? Object.entries(res) : res
}

export const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const mapObj = (o, f) => Object.entries(o).map(([k, v]) => [k, f(v)]).reduce((acc, [k, v]) => ({ ...acc, [k]: v}), {})
export const filterObj = (o, f) => Object.entries(o).filter(([, v]) => f(v)).reduce((acc, [k, v]) => ({ ...acc, [k]: v}), {})

export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )

export const insert = (arr, item, i) => [...arr.slice(0, i), item, ...arr.slice(i)]
export const insertList = (arr, items, indexProp = 'index') => items.reduce((acc, item) => {
  const origPos = item[indexProp]
  return insert(acc, Object.assign(item, { origPos }), item[indexProp])
}, arr.map((i, origPos) => Object.assign(i, { origPos })))

export const groupBosses = (list) => {
  if (!list || !list.length) return [];
  const grouped = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.type === 'gym' || item.boss) {
      const baseName = item.boss ? item.boss.split(' (')[0].trim() : '';
      const variants = [item];
      let j = i + 1;
      
      while (
        j < list.length &&
        (list[j].type === 'gym' || list[j].boss) &&
        list[j].name === item.name &&
        list[j].group === item.group &&
        (list[j].boss ? list[j].boss.split(' (')[0].trim() : '') === baseName
      ) {
        variants.push(list[j]);
        j++;
      }
      
      if (variants.length > 1) {
        grouped.push({
          ...item,
          variants
        });
        i = j - 1; // skip grouped items
      } else {
        grouped.push(item);
      }
    } else {
      grouped.push(item);
    }
  }
  return grouped;
}
