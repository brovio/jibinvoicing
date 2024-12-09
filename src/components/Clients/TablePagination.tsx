interface TablePaginationProps {
  totalResults: number;
}

export const TablePagination = ({ totalResults }: TablePaginationProps) => {
  return (
    <div className="mt-4 flex justify-between items-center text-gray-400">
      <span>Showing 1 to 10 of {totalResults} results</span>
      <div className="flex items-center gap-2">
        <select className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2">
          <option>25 entries</option>
        </select>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-[10px] bg-[#252A38] border border-gray-800">
            &lt;
          </button>
          <button className="px-3 py-1 rounded-[10px] bg-[#0EA5E9] text-white">
            1
          </button>
          <button className="px-3 py-1 rounded-[10px] bg-[#252A38] border border-gray-800">
            2
          </button>
          <button className="px-3 py-1 rounded-[10px] bg-[#252A38] border border-gray-800">
            3
          </button>
          <button className="px-3 py-1 rounded-[10px] bg-[#252A38] border border-gray-800">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};