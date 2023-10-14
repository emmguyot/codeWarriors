function findNextSquare(sq) {
  // Return the next square if sq is a perfect square, -1 otherwise
  let root=Math.sqrt(sq);
  if (Math.abs(root-Math.round(root)) > 1e-12) {
    return -1;
  }
  let intRoot = Math.round(root)
  return (intRoot+1)*(intRoot+1);
}