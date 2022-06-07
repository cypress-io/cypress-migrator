import Head from 'next/head'
import { ReactElement } from 'react'
import { Footer, Navigation, Notifications, SelectList, MigrateEditor, MigrationDiff, GetCypress } from '../components'

const Index = (): ReactElement => {
  return (
    <div>
      <Head>
        <html lang={'en'} />
        <title>Cypress Migrator | Interactive Code Transformer</title>
        <meta property="og:title" content="Cypress Migrator | Interactive Code Transformer" key="title" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Navigation />

      <svg className="left-shape" aria-hidden="true" width="730" height="856" viewBox="0 0 730 856" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M235.028 765.027C168.254 710.886 101.875 634.665 80.7862 549.322C56.7992 451.976 95.7835 325.806 152.82 245.739C223.201 146.91 315.392 104.966 429.727 76.2315C429.727 76.2315 479.722 69.4927 490.038 84.8427C507.348 110.654 509.704 144.523 505.874 179.719C504.293 194.071 501.689 208.652 498.644 222.989C497.833 226.818 496.993 230.622 496.126 234.401C490.124 260.662 483.141 285.746 478.998 306.644C465.919 372.529 460.487 460.744 426.89 520.141C401.706 564.673 387.969 612.241 374.592 660.237C367.562 685.454 360.621 710.798 352.175 735.868C345.789 754.794 333.717 768.633 318.821 776.593C294.324 789.746 262.028 786.951 235.028 765.027Z" fill="#69D3A7"/>
        <path d="M374.597 660.248C361.436 649.617 350.037 636.971 340.825 622.78C300.324 559.944 342.748 477.885 342.748 477.885C355.215 451.169 367.591 424.407 380.143 397.724C401.63 352.043 417.519 304.575 453.869 267.958C466.351 255.387 481.768 237.745 498.655 222.981C497.843 226.81 497.004 230.614 496.136 234.393C490.135 260.654 483.151 285.739 479.008 306.637C465.93 372.521 460.498 460.737 426.901 520.133C401.711 564.685 387.946 612.245 374.597 660.248Z" fill="#007780"/>
        <path d="M644.182 335.203C644.182 335.203 640.83 414.874 619.709 469.753C598.589 524.631 579.082 580.862 548.314 608.028C517.545 635.194 455.824 629.795 418.68 588.622C381.536 547.449 399.825 475.811 399.825 475.811C404.849 452.743 409.812 429.664 414.875 406.614C423.56 367.136 428.083 327.335 448.46 292.134C461.565 269.456 479.403 231.125 502.478 219.379C524.693 208.078 582.887 222.598 605.795 251.545C628.703 280.493 642.152 291.475 644.179 335.215L644.182 335.203Z" fill="#B7E7F0"/>
      </svg>
      <svg className="right-shape" width="1041" height="945" viewBox="0 0 1041 945" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M875.669 696.18C794.672 755.349 688.885 807.486 586.323 805.812C469.355 803.825 338.661 722.204 265.36 633.975C174.876 525.094 155.068 408.585 156.768 271.035C156.768 271.035 164.084 212.628 184.477 205.572C218.758 193.746 257.667 201.194 296.226 216.016C311.944 222.082 327.615 229.37 342.88 237.082C346.957 239.14 350.997 241.222 355.002 243.328C382.834 257.933 409.047 273.296 431.385 284.204C501.803 318.615 599.694 351.063 656.671 406.685C699.392 448.38 748.952 478.068 799.101 507.479C825.45 522.933 851.969 538.324 877.728 555.332C897.172 568.183 909.182 585.929 913.716 605.108C921.244 636.666 908.455 672.263 875.669 696.18Z" fill="#69D3A7"/>
        <path d="M799.113 507.477C783.194 519.152 765.528 528.236 746.771 534.394C663.805 561.333 583.896 488.993 583.896 488.993C557.479 466.958 530.984 445.012 504.629 422.893C459.51 385.024 410.704 352.937 380.245 301.008C369.788 283.177 354.487 260.523 342.872 237.068C346.949 239.126 350.989 241.208 354.994 243.314C382.826 257.919 409.039 273.282 431.377 284.19C501.795 318.601 599.686 351.049 656.663 406.671C699.404 448.378 748.946 478.096 799.113 507.477Z" fill="#003131"/>
        <path d="M508.542 127.272C508.542 127.272 582.355 156.456 625.632 196.096C668.908 235.735 714.11 274.136 727.362 314.855C740.614 355.574 710.695 417.935 656.913 443.228C603.13 468.521 542.903 426.415 542.903 426.415C523.162 413.755 503.386 401.155 483.678 388.461C449.927 366.705 414.198 349.166 389.187 316.647C373.063 295.72 344.077 264.828 342.278 237.074C340.551 210.357 377.657 154.603 414.18 140.15C450.703 125.697 466.473 115.273 508.553 127.278L508.542 127.272Z" fill="#A3E7CB"/>
      </svg>

      <main>
        <div className="max-w-screen-2xl mx-auto py-6 px-6 lg:px-8">
          <div className="flex items-center justify-center pb-6">
            <h1 className="lg:text-5xl sm:text-3xl font-semibold mr-1">Migrate</h1>
            <SelectList />
            <h1 className="lg:text-5xl sm:text-3xl font-semibold"> code to Cypress.</h1>
          </div>
          <MigrateEditor />
          <MigrationDiff />
          <Notifications />
        </div>
      </main>
      <GetCypress />
      <Footer />
    </div>
  )
}

export default Index
