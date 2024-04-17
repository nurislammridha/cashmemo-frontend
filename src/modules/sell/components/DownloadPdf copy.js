import React, { createRef, useRef, useState } from 'react'
import './pdf.css'
import canonIcon from './img/canon.png'
import coolzerIcon from './img/coolzer.png'
import dellIcon from './img/dell.png'
import dlinkIcon from './img/dlink.png'
import hpIcon from './img/hp.png'
import inkIcon from './img/ink.jpg'
import longseIcon from './img/longse.jpg'
import spIcon from './img/sp.jpg'
import { jsPDF } from "jspdf";
import { useHistory, useLocation } from 'react-router-dom'
import moment from 'moment'
import { convertNumberToWords } from '../_redux/SellAction'
import { useReactToPrint } from 'react-to-print';
const DownloadPdf = () => {
    const history = useHistory()
    const location = useLocation()
    const { clientInfo, currentDue, grandTotal, pay, previousDue, sellingDate, sellingProducts, total, discount } = location?.state?.data || {}
    const { name, address, phone } = clientInfo || {}
    let pdfTittle = name + "-" + moment(sellingDate).format('ll')
    const ref = createRef();
    const [loader, setLoader] = useState(false)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: pdfTittle,
    });
    const handleDownLoad = () => {
        setLoader(true);
        var doc = new jsPDF("p", "px", [1000, 1000], "a2", false, false, 2, 1.0);
        doc.html(document.querySelector("#con"), {
            callback: function (pdf) {
                pdf.deletePage(2)
                pdf.deletePage(3)
                pdf.deletePage(4)
                pdf.deletePage(5)
                pdf.deletePage(6)
                pdf.deletePage(2)
                pdf.deletePage(3)
                pdf.deletePage(2)
                pdf.deletePage(2)
                pdf.deletePage(2)
                pdf.save(pdfTittle + ".pdf");
                setLoader(false);
                history.push('/sell')
            },
        });
    }
    // console.log('history?.state?.data', location?.state?.data)
    return (
        <>
            <div className='download'>
                <h6>Download Cash Memo</h6>
                <div>
                    <a
                        className='btn btn-success text-light mr-3'
                        onClick={() => handlePrint()}
                    >
                        {"PRINT"}
                    </a>
                    <a
                        className='btn btn-success text-light'
                        onClick={() => !loader && handleDownLoad()}
                    >
                        {loader ? "Downloading" : "Download"}
                    </a>
                </div>
            </div>
            <div ref={ref} id="con">
                <div className='container' ref={componentRef}>
                    <div className='header'>
                        <h1>It Solutions Computer</h1>
                        <div><span>Show Room :</span> Friends Arcade Market (4th Floor), 77, Lower Jessore Road</div>
                        <div>East Side of Jalil Tower, Khulna, Mobile: +88-01710-121138</div>
                        <div>E-mail: sanjit121138@gmail.com</div>

                    </div>
                    <div className='bill_no'>
                        <div>Bill No : 901</div>
                        <div className='cash_memo'>INVOICE</div>
                        <div><span>{moment(sellingDate).format('ll')}</span></div>
                    </div>
                    <div className='buyer_info'>
                        <div className='name'>Name:<span>{name}</span></div>
                        <div className='phone'>Phone:<span>{phone}</span></div>
                        <div className='address'>Address:<span>{address}</span></div>
                    </div>
                    <div className='table2'>
                        <table >
                            <tr>
                                <th className='sl'>Sl.No</th>
                                <th>Particular</th>
                                <th className='qty'>QTY</th>
                                <th className='unit_price'>UNIT PRICE</th>
                                <th className='amount_tk'>AMOUNT TK</th>
                            </tr>
                            {sellingProducts?.length > 0 && sellingProducts.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.productName}</td>
                                    <td>{item?.quantity}</td>
                                    <td>{item?.mrp}</td>
                                    <td>{item?.mrp * item?.quantity}</td>
                                </tr>
                            ))}

                            <tr>
                                <td colSpan={3} rowSpan={3} className='goods total'>

                                    <div className='mt-2'>Goods received in good order & condition.</div>
                                    <div>sold Goods are not returnable & refundable</div>

                                </td>
                                <th><span>Total</span></th>
                                <td><span>{total}</span></td>
                            </tr>
                            <tr>
                                <th><span>Pre. Due</span></th>
                                <td><span>{previousDue}</span></td>
                            </tr>
                            <tr>
                                <th><span>Discount</span></th>
                                <td><span>{discount}</span></td>
                            </tr>

                            <tr>
                                <td colSpan={3} rowSpan={3} className='total'>
                                    <span> {convertNumberToWords(pay)} Taka Only</span>
                                </td>
                                <th><span>Gra. Total</span></th>
                                <td><span>{grandTotal}</span></td>
                            </tr>
                            <tr>

                                <th>PAY</th>
                                <td>{pay}</td>
                            </tr>
                            <tr>
                                <th>BALANCE</th>
                                <td>{currentDue}</td>
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
            </div>

        </>
    )
}

export default DownloadPdf