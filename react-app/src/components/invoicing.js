import React from 'react';
import ReactDOM from 'react-dom/client';
import { Page, Text, View, Document, StyleSheet, ReactPDF } from '@react-pdf/renderer';

//TODO css styling for invoice pdf
const styles = StyleSheet.create({
    page: {},
    name: {},
    pickupLoc: {},
    total: {},
    payType: {},
    paidCash: {},
});

//takes values from order form and renders invoice pdf to a file that can be sent by email
function genInvoice(order) {
    const paidCash = false;
    if (order.payment == 'invoice') paidCash = true;

    const nameDisp = 'Name: ' + order.firstName + ' ' + order.lastName;
    const priceDisp = 'Total: $' + (order.numBags * bagPrice);
    const payTypeDisp = 'Payment Method: ' + order.payment;
    const pickupLocDisp = 'Pickup Address: ' + order.pickUp;
    const paidCashDisp = paidCash ? 'CASH PAYMENT DUE ON PICKUP' : '';

    //using React-PDF, pdf is treated as react component and can be styled with css
    const invoiceDoc = () => (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.name}>
                    <Text>{nameDisp} </Text>
                </View>

                <View style={styles.total}>
                    <Text>{priceDisp}</Text>
                </View>

                <View style={styles.payType}>
                    <Text>{payTypeDisp}</Text>
                </View>

                <View style={styles.pickupLoc}>
                    <Text>{pickupLocDisp}</Text>
                </View>

                <View style={styles.paidCash}>
                    <Text>{paidCashDisp}</Text>
                </View>
                
            </Page>
        </Document>
    );

    //TODO come up with unique naming so pdfs can be attached to email and subsequently deleted but so concurrent orders aren't confused
    ReactPDF.render(<invoiceDoc />, `${__dirname}/example.pdf`);
}
