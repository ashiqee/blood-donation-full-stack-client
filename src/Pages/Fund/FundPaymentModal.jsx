import { Dialog, Transition } from "@headlessui/react";
import { Box, TextField } from "@mui/material";

import { Fragment, useRef, useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import Swal from "sweetalert2";



import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingCom from "../../Components/Loading/LoadingCom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FundPaymentModal = ({ fundData }) => {
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const axisSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    <LoadingCom loading={loading} />

    console.log(fundData);
    const amount = fundData?.amount


    useEffect(() => {
        if (amount > 0) {
            axisSecure.post('/create-payment-intent', { amount: amount })
                .then(res => {
                    console.log(res.data?.clientSecret);
                    setClientSecret(res.data?.clientSecret)
                })

        }
    }, [axisSecure, amount])

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });
        if (error) {
            console.log("payment error", error);
            setError(error.message);
        } else {
            console.log("Payment Method", paymentMethod);
            setError("");
        }
        //confirm payment
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous",
                    },
                },
            });
        if (confirmError) {
            console.log("Confirm error");
        } else {
            console.log("payment Intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log(("transaction id", paymentIntent.id));
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    funderEmail: user?.email,
                    funderName: user?.displayName,

                    funderCompany: fundData?.funderCompany,
                    funderLogo: fundData?.funderLogo,
                    amount: fundData?.amount,

                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to
                    status: "Completed",
                };
                const res = await axisSecure.post("/payments", payment);


                if (res.data.paymentResult._id) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: " Your Payment has been Successful",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/dashboard/myFundHistory')
                }
            }
        }



    }



    return (
        <>

            {
                fundData?.amount === '' ? <>  <button

                    disabled
                    className="btn py-2 px-3 rounded-xl text-white bg-[#565656]"
                    onClick={() => setOpen(true)}
                    ref={cancelButtonRef}
                >

                    {"Donate Fund"}
                </button></> : <>  <button
                    type="submit"

                    className="btn py-2 px-3 rounded-xl text-white bg-[#f34334]"
                    onClick={() => setOpen(true)}
                    ref={cancelButtonRef}
                >

                    {"Donate Fund"}
                </button></>
            }
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-9999 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Box component="form" onSubmit={handlePaymentSubmit}>
                                    <Dialog.Panel
                                        className="relative z-9999 transform overflow-hidden
                   rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:min-w-[500px] sm:max-w-2xl"
                                    >
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <h2 className="text-3xl mb-5 text-center">Donate Payment Getway</h2>
                                            <img className="w-12 mx-auto mb-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAllBMVEX///9mW/9eUv9YS/9cT/9dUf9ZTf/l4//Qzf+7t/9WSf9gVP/z8/+zr/9kWf9iVv/HxP/Y1v/LyP95cP+Si/+loP/DwP+xrf+uqf/s6/+oo//7+/+Mhf+fmf/z8v/V0//d2/+Xkf+5tf9wZv/u7f+Cev+hm/+Hf/9qYP9uZP92bf9/d//h3/9OP//n5v+Oh/9IOf9GNf8H4em/AAALMElEQVR4nO2d6WKyOhCGBULURINbrRUV1Na97Xfu/+YOmwhkwuLS0nben0AgPCZhMjOJjQYKhUKhUCgUCoVCoVAoFAqFQqFQKBQKdT8t7O+uwc+Q7bZH2r/md1ej/mqO52tGdUtQhJWn18H0aFCTC80XwlKp43RnpkEiTggrT6134nU8LSWEpVCLaJIQlkIIq4IQVgX9IViL1rR32x3+BizbXY0EI6x9221+P6zA1g4/+TrCUsu3tVlsayMstZyZnra1EZZaXSqyL4awVOrq0ovdH5aw3hEWrBQsYemE7ZbtX+H8eyQswU2DzLpO5z5V/X4BsMzxbbf0YXkNirLh0+DlPrWsiR4BiwUd73SfCtZJD4DlTn5Px0vrAbB+rxBWBUGwbvQ6/F4hrFj2i9sa9HqDlnN6hc3CmsF6dVu9Xqv/el1pu9n3ig+cU9UPjO1MtpxRSohpEkIoZWQ4b7tZZPeAZQ+etof9cDZtFdvpHUnxqZfVlho0qK7B3roVJ0jN1af3uuHbeu+6fS5tutjjI5PjUYJ7U4/DtJ+8EoCl6Syl/6Ir39OH2T8nOL5YMsItIYTF2dw/MMhe6F8bvfrin3QmqshgyHQrUVfd2JefSbxMBU29rm8U82mZBvqyZKbkS7gQo3Tp5MLKiIVXtrNX6s/+4RXj8RH+5B/J8zp0DOlM0AJaOyLVWJhkVQrVacs48L6Cs8+PgqKdUaL6sCxiuLfDsrbe0RFNHLkGlm+o2FsD/HGFqfWl98tqMWMWVDioYtjWlWoXovJFWrfD0qjHykweuAYWnzf6RPm2gm0KWLXVqHzp3FWX3dK8orHuA+u1nX7aNbDEYcyUY4Ync5j31bDfit5XsK6q7L5Ms9LuBIt3zcyBK2B5Q3n+4y1NbQi8aiXely5hVlpuk0zoLrCkml4Fq1DCUtFqyj5xSGQEFV6XZXUnWFk9BpYmdjCrj9z+mxABhvlR8evExX8SLI0fIVYLtX2UlSGZbC1W/vE/C5ZGpgCsfWlW3jtk5wNZgz336T8LlsbcW/qR3JNXZnGZWD8NltCyrAYV+pEnPd02qzSsHwdLMydpVrY8PcoXS04UnXLWaKQfB0tjafthWdKgjGXNkqVLmw2+fh4snpr3fMCdUOiEUqKDjS45xsPfUT8g7MnUebqXxrCe6wNLCCtvKGHJac8MahoWe2u7Ly9uewgZYNbnBTVYC50s261+v9VrP812/lKH84lcWJyk9P4VsCzCxPHzc0iVk2o9MccDGxbdxiHd0xqoLFucTw+AGmr0Kdl0bXe1PacX5cHiT61BUr0iWIKb1GDMoOxaWIJtB9GY5CjcNV7Du7wKNGKxlPNrKVdCj78R0NjDASvf2ej+b5cHyxzIxXJgCaLPB82ObS9O7fF1sPRD0mZ04DFHo7FvywYaFssE8EYSzwvtDcCawm5VZ8t4LizYB6+Ape+ybCvDopkftbMDu+Llt2/LJqUuNYydhJye3fIj4P4MfGlPr5v3e8FiT9KFVWFx6Ra2gNqWIOfzQ9kFzaVqyLYUPxumICy122xxdk7fCIsB11aFFbfyi5qgZUDdqPLyWShN6pBFKvY5sMokWt0GC4z03wFWYwL9MmGEpNEYy70Qahdyhc+G7RyyaGlx7Ow2WGBHvwesBhSuCSIkDahhnM+k9CI96/wk8KcQrDCWVFdYwBgeREh8yV9LHfSzS9edB60e7HMgu4Lwcl1hNaCprhFYnXKLUdziTRq03sITsAXvf0LMp7xAeB1ggXYdZHeGTAD7Gx5vpOmyMKMz4Nc2uIIbu2dlZLa2sBzgLvpKUWXYonySeJ9H+GmOz0LobN2FLVRgrKsHLMhKDz0PwIffmo0ASbZD3AJf8j2HHq8jBKG2sGQz6eyTAk5oFiT5unhskydDGQlCJlIErr6wAGNIHPwTVdznGcWWZ6fYKe01r03GeqsvLOB54VS4mvM9pYvjYVzmLjwT+q8vLPA2iluUVcLdOod8WnLd9sllDzWApXieC1ha/vNeKgUb0rISaQ+jUrREcvZbX1hNBayPW2Alsx425foze/4BsCAo/vNO94LV6OWndsUPjQeuvwyrsXhTuLAzTz0bHPWF9fBuGNQVyGWVJIxO3WH1gdv4vtJ7DfCRBnta2BnPHqD6whrIxmdgZ91kOkD5uM6MKUIksaK8lPrCAuJVoQV/g1HK4XTeRXdHIW9jrKhp1RcWkI8Q1vmGbijHRs46bUx1zvQ5QDuRZ2A1gSWHsjQeDDlroA1kgugqMSgpLq53TncMJ5WAZ+fLYYHrG6GpbhixAPIc+NTtl1L+iotOlytSL0N/Rx1aFggL8pOHNQN+Xz6BbnGN2nBnDH2stYUF5cmEvjsgEgZGd66T/QYHk31Tq67dEHQ4hdFByISndwEVaqaMKkKw4DXSXwsLaPFxFi3AkTjAPa4VNMwHDwBg6fAA8KWwbMjy5JH9fQQcztX64RF2oUWCAtaBQxqApXjwl8ICfeTnC6H0KlZpz42DkRdPhe6vgqXIvvlKO2sATmlY5LWEBi3VkhVYQyGI1VUtCYLSt1TdUBEMfxisc5z4ohM4o7nwgGKkvKgjuomotZ+zJHQ2AwPZ4O1VA7zHALLdHgZL44dF6gYOvIApTq8CR39Nl5inKnV8T+QURQleFqHLgZR/A+bYBKYDmK0sTDdR2H40LE0Yybascvca8bAEx0i5gBuK16i8iZ/QZVgBLzacthIBaPcIhdpCoxSw8Pxz7NMJGNmn9va/h8PymoWx7DW9H2/R3xBF/DNORfN0hM1suh5L7aQ5HpHApQDD8otxYhiH0WYymWy2JryEMZzuQCkFwVnC9P2O+ungOXnwd4PlPTDMeFah8r4DiZdVLScRJjts2i232Wye+oP2ZLRm1Iwi00pYYUmLc51zVSJ+WBhIOYzLRwPd18AqlJF8BhTCj2rN/VUW1N/9I71SIh9WgaKVP8rsm8uFtYCVNpXd6h7AW2CJaHUoOPanVA9YRno0+qy60OkmWDT6dPQLHY+1gGVmbD+73FryhG6AJdbnglpRwTrAkg30KoucA90A67KOtl0U868DLGDqN6+YenQ9rOTqjaIhvgawCOQIeas2bF0Ny1onHlrUoL8fFodnModKtK6FJURqwl2wjv3bYaV+2qSGVRbgXwnLEumJa2OfG8D+bljWXrkGaVYhhngdLPOQfXhH5NH6Zli6VN2EumV3WElPl8ruQwPuSNXZ5XT/x8PK600GuOtOrI99yT0L+HvCJzHe0RLjnaB72P+asw/Vo2HpPfWGYdwo3GF2RYvSOgJH3zztF3XnlOSmN2gWlZadxlLu6CZyFpTfywf/egQNcouNymyiOTFzW5fgVOsCXdmZW4YJuxmERdhnXsCoMwdC/V4pGjkoV0yX9A7Cgi4sCli01tk0Ka81fJbdfrN3ZPBr+7tKWhtXVe5jvNwxGmzkEJb298TUCbMAB2oW1/OOmTwsFpYy9GXcFPvPXUlg0KwJXbgogOXdf2n422cG8v+e4LBaQHdX1X084kbglInkVd8kTIzaRcDtU2+yfFtbxGAGtdbb+copuafsx3h+FNQrxddvy+79977PD4W5q+VxZ1m74WjSumKX9FdntZkN98KytPVwNp+M3Z+91Xr5XAdUlfwsFMKqIIRVQQirghBWBSGsCkJYFQTCys0s+8OqsJIVhbAqCGFVEMKqIIRVQeV3OUIhrCpCWBWUheU7kN9xzIKVhOUnvpLZ82/9m83bFcHyNxhmx+kv+3/be6tjBJGb9Xz8K/6F+7Fa/CdGK+l/A1Gg7Cv/5hGFQqFQKBQKhUKhUCgUCoVCoVAoFAr1R/U/t9nhIhjT9goAAAAASUVORK5CYII=" alt="" />
                                            <div className="flex-col space-y-4 my-auto items-center justify-center  p-5 gap-5">
                                                <div className="flex gap-5">
                                                    <div className="w-full border-2 border-blue-900 p-3">
                                                        <CardElement
                                                            options={{
                                                                style: {
                                                                    base: {
                                                                        fontSize: '16px',

                                                                        color: '#424770',

                                                                        '::placeholder': {
                                                                            color: '#aab7c4',
                                                                        },
                                                                    },
                                                                    invalid: {
                                                                        color: '#9e2146',
                                                                    },
                                                                },
                                                            }}
                                                        />

                                                    </div>


                                                </div>
                                                <div>
                                                    <p className="text-red-600" >{error}</p>
                                                    {transactionId && <p className="text-green-600">
                                                        Your Transcation id : {transactionId}
                                                    </p>}
                                                </div>

                                            </div>
                                        </div>

                                        {/* buttom section  */}
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            >
                                                Payment
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Box>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root >
        </>
    );
};

export default FundPaymentModal;