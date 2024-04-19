import React, { createRef, useRef, useState } from 'react'
import './pdf.css'

import { jsPDF } from "jspdf";
import { useHistory, useLocation } from 'react-router-dom'
import moment from 'moment'
import { convertNumberToWords } from '../_redux/SellAction'
import { useReactToPrint } from 'react-to-print';
import { genInvoice } from 'src/services/GlobalFunction';
const DownloadPdf = () => {
    const toDay = new Date()
    const history = useHistory()
    const location = useLocation()
    const invoice = location?.state?.index || 0
    const { clientInfo, currentDue, grandTotal, pay, previousDue, sellingDate, sellingProducts, total, discount, serviceCharge, vat } = location?.state?.data || {}
    const { name, address, phone, tel } = clientInfo || {}
    let pdfTittle = name + "-" + moment(sellingDate).format('lll')
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
                    <div className='invoice'>
                        <span>Invoice/Bill</span>
                    </div>
                    <div className='table2'>
                        <table>
                            <tr>
                                <td colSpan={2}>
                                    <div>
                                        <div className='ti_con'>
                                            <div className='title'>IT COMPUTER SOLUTIONS</div>
                                            <div className='trust'>Trust in Our Quality</div>
                                        </div>
                                        <div className='txt'>77, LOWER JESHORE ROAD, FRIDENDS ARCADE MARKET,</div>
                                        <div className='txt'>4TH FLOOR, KHULNA-9100</div>
                                        <div className='txt'>CELL 01710-121138</div>
                                    </div>
                                </td>
                                <td colSpan={3}>
                                    <div>Invoice No: {genInvoice(invoice)}</div>
                                    <div>Sold By: SANJIT</div>
                                    <div>Ref No: </div>
                                    <div>Date: {moment(sellingDate).format("DD/MM/YYYY")}</div>
                                </td>
                                <td colSpan={2}>
                                    <div>Print Date</div>
                                    <div>{moment(toDay).format("DD/MM/YYYY")}</div>
                                    <div>Print Time</div>
                                    <div>{moment(toDay).format("LT")}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div>
                                        <div className='to'>To</div>
                                        <div className='shop_name'>{name}</div>
                                        <div>{address}</div>
                                        <div>{phone}</div>
                                        <div>{tel}</div>
                                    </div>
                                </td>
                                <td colSpan={5}>
                                    Attention
                                </td>
                            </tr>
                            <tr>
                                <th>SL</th>
                                <th>Description</th>
                                <th>Qty</th>
                                <th>Unit</th>
                                <th>Warranty</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                            </tr>
                            {sellingProducts?.length > 0 && sellingProducts.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.productName}</td>
                                    <td>{item?.quantity}</td>
                                    <td>{item?.unit}</td>
                                    <td>{item?.warranty}</td>
                                    <td>{item?.mrp}</td>
                                    <td>{item?.mrp * item?.quantity}</td>
                                </tr>
                            ))}

                            <tr>
                                <td></td>
                                <td colSpan={6}>
                                    <div className='footer'>
                                        <div className='left'>
                                            <div>{convertNumberToWords(total)} Only</div>
                                            <div className='fsb crnt'>
                                                <div>Current Due Amount</div>
                                                <div className='ml-5'>{currentDue}</div>
                                            </div>
                                        </div>
                                        <div className='right'>
                                            <div className='fsb taka'><div>Total Amount (BDT)</div><div>{total}</div></div>
                                            <div className='fsb taka'><div>Add Vat (BDT)</div><div>{vat}</div></div>
                                            <div className='fsb taka'><div>Less Discount (BDT)</div><div>{discount}</div></div>
                                            <div className='fsb taka bb'><div>Add Installation/Service Charges (BDT)</div><div>{serviceCharge}</div></div>
                                            <div className='fsb taka2 pay'><div>Net Payable Amount</div><div>{grandTotal}</div></div>
                                            <div className='fsb taka2'><div>Previous Due Amount</div><div>{previousDue}</div></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DownloadPdf