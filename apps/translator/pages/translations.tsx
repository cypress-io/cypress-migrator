import { ReactElement } from 'react';
import Head from 'next/head';
import { Navigation, AvailableCodeMods, Notifications, BackButton } from '../components'
import { getAllCodeMods } from '../api';

const Translations = ({ allCodeMods }: { allCodeMods: string[] }): ReactElement => (
    <div className={'h-full'}>
        <Head>
        <title>Cypress Translator | Interactive Code Transformer</title>
        <meta property="og:title" content="Cypress Translator | Interactive Code Transformer" key="title" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="shortcut icon" href="public/favicon.ico" type="image/x-icon" />
        </Head>
        <Navigation />
        <main className="h-full">
        <div className="max-w-7xl h-full mx-auto py-6 sm:px-6 lg:px-8">
            <BackButton />
            <AvailableCodeMods allCodeMods={allCodeMods} />
            <Notifications />
        </div>
        </main>
    </div>
)

export default Translations
export async function getStaticProps() {
    const allCodeMods = getAllCodeMods();
    return { props: { allCodeMods }}
}