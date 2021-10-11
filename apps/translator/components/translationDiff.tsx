import { ReactElement } from "react";
import { selectDiffApiItems, useAppSelector } from "../app";


const TranslationDiff = (): ReactElement => {
    const diff = useAppSelector(selectDiffApiItems);

    return (
        <>
            {diff.length > 0 ?  <>
                <h2 className="text-3xl leading-6 font-bold text-gray-900 mb-4 capitalize">Cypress Api Methods Used</h2>
                <hr />
                <ul className="list-inside list-disc p-4 mb-4">
                    {diff.map((d, i: number) => <li key={i}><a className="text-green-400" href={d.url} rel="noreferrer" target='_blank'>{d.command}</a></li>)}
                </ul>
            </> : null}
        </>
    )
}
export default TranslationDiff;