import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
    return (
        <Layout title={"About this Website"}>
            <div className=' m-16 mt-36'>
                <img src="/images/about.jpg" alt="about" style={{ width: "65%" }} />
            </div>

        </Layout>
    )
}

export default About
