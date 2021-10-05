import { decreaseFontSize, increaseFontSize, selectFontSize, useAppDispatch, useAppSelector } from "../app";

export const FontSizeButtons = () => {
    const size = useAppSelector(selectFontSize);
    const dispatch = useAppDispatch();
  
    return (
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-900">Font Size: <span className="font-bold text-lg">{size}</span></span>
        <button
            className="bg-green-400 text-white hover:bg-green-500 hover:text-white active:bg-green-500 font-bold uppercase text-xs px-2 py-1 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 ml-4"
            type="button"
            onClick={() => dispatch(decreaseFontSize())}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
        </button>
        <button
            className="bg-green-400 text-white hover:bg-green-500 hover:text-white active:bg-green-500 font-bold uppercase text-xs px-2 py-1 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => dispatch(increaseFontSize())}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </button>
      </div>
    )
  }
export default FontSizeButtons;