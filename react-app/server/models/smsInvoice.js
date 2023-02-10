module.exports = ({ firstName, lastName, numBags, date, _id }) => {
    const total = (numBags*price).toFixed(2);

    return `Thank you ${firstName} ${lastName} for your purchase of ${numBags} bags of firewood on ${date}. Your total is $${total}.\n\n
            Your order will be available for pick up at ${address}. Please contact ${adminName} at ${adminPhone} to schedule a time.\n\n
            Order Number: ${_id}\n\n
            Please be prepared to show this receipt at time of pick up.`;
};
