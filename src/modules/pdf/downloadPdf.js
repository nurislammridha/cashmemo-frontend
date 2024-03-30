import React from 'react'
import './pdf.css'
import canonIcon from './img/canon.png'
import coolzerIcon from './img/coolzer.png'
import dellIcon from './img/dell.png'
import dlinkIcon from './img/dlink.png'
import hpIcon from './img/hp.png'
import inkIcon from './img/ink.jpg'
import longseIcon from './img/longse.jpg'
import spIcon from './img/sp.jpg'
const DownloadPdf = ({ ref }) => {
    return (
        <div ref={ref} className='container'>
            <div className='header'>
                <h1>It Solutions Computer</h1>
                <div><span>Show Room :</span> Friends Arcade Market (4th Floor), 77, Lower Jessore Road</div>
                <div>East Side of Jalil Tower, Khulna, Mobile: +88-01710-121138</div>
                <div>E-mail: sanjit121138@gmail.com</div>

            </div>
            <div className='bill_no'>
                <div>Bill No : 901</div>
                <div className='cash_memo'>CASH MEMO</div>
                <div>Date: <span>15 sep 2024</span></div>
            </div>
            <div className='buyer_info'>
                <div className='name'>Name:<span>Mohammad Jamil Islam</span></div>
                <div className='phone'>Phone:<span>01753109207</span></div>
                <div className='address'>Address:<span>Rajapur, Mograbazar, Bagerhat</span></div>
            </div>
            <div className='table'>
                <table >
                    <tr>
                        <th className='sl'>Sl.No</th>
                        <th>Particular</th>
                        <th className='qty'>QTY</th>
                        <th className='unit_price'>UNIT PRICE</th>
                        <th className='amount_tk'>AMOUNT TK</th>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Mouse pad black color</td>
                        <td>1</td>
                        <td>12</td>
                        <td>24</td>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Mouse pad black color</td>
                        <td>1</td>
                        <td>12</td>
                        <td>24</td>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Mouse pad black color</td>
                        <td>1</td>
                        <td>12</td>
                        <td>24</td>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Mouse pad black color</td>
                        <td>1</td>
                        <td>12</td>
                        <td>24</td>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Mouse pad black color</td>
                        <td>1</td>
                        <td>12</td>
                        <td>24</td>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>Mouse pad black color</td>
                        <td>1</td>
                        <td>12</td>
                        <td>24</td>
                    </tr>
                    <tr>
                        <td colSpan={3} className='goods'>
                            <div >Goods received in good order & condition.</div>
                            <div>sold Goods are not returnable & refundable</div>
                        </td>
                        <th className='total'><span>Total</span></th>
                        <td className='total'><span>123</span></td>
                    </tr>
                    <tr>
                        <td colSpan={3} rowSpan={2} >
                            <span> Taka in words: Fifty lakh five thousand fifty two taka only.</span>
                        </td>
                        <th>ADVANCE</th>
                        <td>123</td>
                    </tr>
                    <tr>
                        <th>BALANCE</th>
                        <td>445</td>
                    </tr>
                </table>
            </div>
            <div className='footer'>
                <div className='signature'>
                    <div className='client_signature'>Client's Signature</div>
                    <div className='authorized_signature'>Authorized Signature</div>
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

export default DownloadPdf