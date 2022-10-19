import RHFTextField from 'components/form-controls/RHFTextField'
import React from 'react'

const TwoFactorVerification = () => {
    return (
        <>
            <h6>Set up two-factor authentication</h6>
            <p>To be able to authorize you need to scan this QR code with your google authentication and enter the verification code</p>
            <h6>Verification Code</h6>


            <div className='text-center'>
                <img height={200} src='images/QRCode.jpg'></img>
            </div>
            <form>
                <div className="container height-100 d-flex justify-content-center align-items-center">
                    <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">

                        <div className='m-2'>
                            <RHFTextField
                                name="first"
                                id="first"
                                maxLength="1"
                                className="m-auto text-center form-control rounded"
                                type="text"
                                isController={false} />
                        </div>

                        <div className='m-2'>
                            <RHFTextField
                                name="second"
                                id="second"
                                maxLength="1"
                                className="m-auto text-center form-control rounded"
                                type="text"
                                isController={false} />
                        </div>

                        <div className='m-2'>
                            <RHFTextField
                                name="third"
                                id="third"
                                maxLength="1"
                                className="m-auto text-center form-control rounded"
                                type="text"
                                isController={false} />
                        </div>

                        <div className='m-2'>
                            <RHFTextField
                                name="fourth"
                                id="fourth"
                                maxLength="1"
                                className="m-auto text-center form-control rounded"
                                type="text"
                                isController={false} />
                        </div>

                        <div className='m-2'>
                            <RHFTextField
                                name="fifth"
                                id="fifth"
                                maxLength="1"
                                className="m-auto text-center form-control rounded"
                                type="text"
                                isController={false} />
                        </div>

                        <div className='m-2'>
                            <RHFTextField
                                name="sixth"
                                id="sixth"
                                maxLength="1"
                                className="m-auto text-center form-control rounded"
                                type="text"
                                isController={false} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default TwoFactorVerification
