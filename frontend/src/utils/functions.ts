export const getRandomFileName = () => {
  const timestamp = new Date().toISOString().split('T')[1].replace(/[-:.]/g,"");  
  const random = ("" + Math.random()).substring(2, 8); 
  const random_number = timestamp+random;  
  return `file${random_number}.txt`;
}

export const isEverythingUnique = (arr: any[], key: string) => {
  const uniques = new Set(arr.map(item => item[key]));
  console.log(uniques)
  return [...uniques].length === arr.length; 
}