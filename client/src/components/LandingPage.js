import React from 'react'
import NavBar from './NavBar'

const LandingPage = () => {
    return (
        <div>
            <NavBar/>
            <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                <div class="card card0 border-0">
                    <div class="row d-flex">
                        <div class="col-lg-6">
                            <div class="card1 pb-5">
                                <br /> <br />
                                <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                                    <img src="https://simplyfi.tech/images/LMS/Digital-Loan-Management.svg" class="image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
