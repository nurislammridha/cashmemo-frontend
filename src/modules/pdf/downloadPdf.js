import React from 'react'
import './pdf.css'
import canonIcon from './img/canon.png'
import coolzerIcon from './img/coolzer.png'
import dellIcon from './img/dell.png'
import dlinkIcon from './img/dlink.png'
import hpIcon from './img/hp.png'
import inkIcon from './img/ink.png'
import longseIcon from './img/longse.png'
import spIcon from './img/sp.png'
const downloadPdf = () => {
    return (
        <div className='container'>
            <div className='header'>
                <h1>It Solutions Computer</h1>
                <div><span>Show Room:</span> Friends Arcade Market (4th Floor), 77, Lower Jessore Road</div>
                <div>East Side of Jalil Tower, Khulna, Mobile: +88-01710-121138</div>
                <div>E-mail: sanjit121138@gmail.com</div>
                <div>
                    <div>Bill No: 901</div>
                    <div className='cash_memo'>Cash Memo</div>
                    <div>Date: <span>.............</span></div>
                </div>
            </div>
            <div className='buyer_info'>
                <div className='name'>Name:<span>............................</span></div>
                <div className='phone'>Phone:<span>............................</span></div>
                <div className='address'>Address:<span>............................</span></div>
            </div>
            <div className='table'>
                <table>
                    <tr>
                        <th>Sl.No</th>
                        <th>Particular</th>
                        <th>QTY</th>
                        <th>UNIT PRICE</th>
                        <th>AMOUNT TK</th>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Mouse</td>
                        <td>1</td>
                        <td>12</td>
                        <td>24</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div>Goods received in good order & condition.</div>
                            <div>sold Goods are not returnable & refundable</div>
                        </td>
                        <th>Total</th>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>
                            Taka in words <span>........</span>
                        </td>
                        <td>ADVANCE</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>BALANCE</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div className='footer'>
                <div className='signature'>
                    <div className='client_signature'>Client's signature</div>
                    <div className='authorized_signature'>Authorized signature</div>
                </div>
                <div className='footer_img'>
                    <img src={longseIcon} alt='img' />
                    <img src={hpIcon} alt='img' />
                    <img src={dellIcon} alt='img' />
                    <img src={canonIcon} alt='img' />
                    <img src={dlinkIcon} alt='img' />
                    <img src={spIcon} alt='img' />
                    <img src={coolzerIcon} alt='img' />
                    <img src={inkIcon} alt='img' />
                </div>
            </div>
        </div>
    )
}

export default downloadPdf