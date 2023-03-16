export const getRandomFileName = () => {
  const timestamp = new Date().toISOString().split('T')[1].replace(/[-:.]/g,"");  
  const random = ("" + Math.random()).substring(2, 8); 
  const random_number = timestamp+random;  
  return `file${random_number}.txt`;
}

export const isEverythingUnique = (arr: any[], key: string) => {
  const updatedArr = arr.filter(item => item[key] !== '');
  const uniques = new Set(updatedArr.map(item => item[key]))
  return [...uniques].length === updatedArr.length; 
}