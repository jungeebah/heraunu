import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '96px',
        height: '30px'
    },
}))
const Logo = (props) => {
    const classes = useStyles()
    const darkTheme = props.theme
    const lightBackground = "#a8dadc"
    const darkBackground = "#f1f1f1"
    return (

        <svg id="SVGRoot" className={classes.root} version="1.1" viewBox="0 0 241.91 74.348" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-18.209,-114.15)">
                <rect x="18.209" y="114.15" width="63.5" height="74.083" opacity="0" strokeWidth=".265" style={{ paintOrder:"stroke fill markers"}} />
                <rect x="18.209" y="124.73" width="169.33" height="63.5" ry="5.2476" fill={darkTheme ? darkBackground : lightBackground} fill-rule="evenodd" stroke="#000"  strokeLinecap="round" strokeLinejoin="round" strokeWidth=".265" style={{ paintOrder:"stroke fill markers"}} />
                <g transform="translate(3.1422)" fill="#e63946" strokeWidth=".26458" aria-label="HERA">
                    <path d="m26.942 152.08h22.647v-14.536h6.4492v35.57h-6.4492v-14.536h-22.647v14.536h-6.4492v-35.57h6.4492z" />
                    <path d="m92.848 158.58h-20.365v-6.4988h20.365zm2.9021 14.536h-23.267q-1.3395 0-2.927-0.47129t-2.9518-1.5379q-1.3395-1.0914-2.2572-2.8029-0.89297-1.7363-0.89297-4.2416v-23.267q0-0.66973 0.24805-1.265 0.24805-0.59531 0.66973-1.0418 0.44648-0.44648 1.0418-0.69453 0.59531-0.24804 1.2898-0.24804h29.046v6.4492h-25.846v20.067q0 1.265 0.66973 1.9348 0.66973 0.66973 1.9596 0.66973h23.217z" />
                    <path d="m137.55 149.5q0 2.2076-0.5457 3.9439t-1.4883 3.0758q-0.91778 1.3146-2.1332 2.2572-1.2154 0.94258-2.5549 1.5627-1.3146 0.59532-2.6789 0.86817-1.3395 0.27285-2.5301 0.27285l13.469 11.633h-9.9715l-13.444-11.633h-4.6385v-6.4492h14.585q1.2154-0.0992 2.2076-0.49609 1.017-0.42168 1.7363-1.1162 0.74414-0.69453 1.141-1.6619 0.39687-0.99218 0.39687-2.2572v-4.068q0-0.54571-0.14882-0.81856-0.12403-0.29765-0.34727-0.42168-0.19844-0.14883-0.44648-0.17363-0.22325-0.0248-0.42168-0.0248h-21.282v29.121h-6.4492v-32.321q0-0.66973 0.24804-1.265 0.24805-0.59531 0.66973-1.0418 0.44648-0.44648 1.0418-0.69453 0.59531-0.24804 1.2898-0.24804h24.482q2.158 0 3.6463 0.79375 1.4883 0.76894 2.406 1.9596 0.94258 1.1658 1.3394 2.5301 0.42168 1.3642 0.42168 2.5549z" />
                    <path d="m178.97 173.11h-6.4492v-8.7312h-22.671v8.7312h-6.4492v-17.785q0-3.8943 1.3394-7.1686 1.3395-3.2742 3.7207-5.6307 2.3812-2.3564 5.6307-3.6711 3.2494-1.3146 7.0941-1.3146h14.536q0.66972 0 1.265 0.24804 0.59531 0.24805 1.0418 0.69453 0.44649 0.44649 0.69453 1.0418 0.24805 0.59531 0.24805 1.265zm-29.121-15.18h22.671v-13.94h-11.336q-0.29766 0-1.265 0.0992-0.94258 0.0744-2.2076 0.42168-1.2402 0.34727-2.6293 1.0666t-2.5549 1.9844q-1.1658 1.265-1.9348 3.175-0.74414 1.8852-0.74414 4.5889z" />
                </g>
                <circle cx="222.32" cy="162.53" r=".32777" fill="#f00" stroke="#000" strokeWidth=".26458" />
                <path d="m181.86 157.93h76.829v6.5262h-76.829z" fill="#e63946" style={{ paintOrder:"stroke fill markers"}} />
                <g fill="#e63946" strokeWidth=".26458" aria-label="UNA">
                    <path d="m208.78 153.95q0 0.34727-0.12403 0.64492-0.12402 0.29766-0.34726 0.5209-0.22324 0.21084-0.5209 0.33486-0.29766 0.12403-0.63252 0.12403h-7.2678q-1.0294 0-2.0836-0.22324-1.0542-0.22325-2.0464-0.68213-0.97979-0.47129-1.848-1.1906-0.86817-0.71933-1.5255-1.6991-0.64492-0.99219-1.017-2.2572-0.37207-1.2774-0.37207-2.8401v-8.8925h3.2246v8.8925q0 1.3643 0.37207 2.3068 0.38447 0.94258 0.96738 1.5751t1.2774 0.99219 1.3146 0.5333q0.63252 0.17363 1.1038 0.22324 0.48369 0.0372 0.63252 0.0372h5.6679v-14.56h3.2246z" />
                    <path d="m230.31 154.2q0 0.34726-0.13643 0.64492-0.12402 0.29766-0.34727 0.5209-0.21084 0.21084-0.50849 0.33486-0.29766 0.12402-0.63252 0.12402-0.29766 0-0.60772-0.11162-0.29765-0.11162-0.5333-0.35966l-11.782-12.303v12.526h-3.2246v-16.408q0-0.4961 0.27285-0.89297 0.28525-0.40928 0.71933-0.60772 0.45889-0.18603 0.94258-0.0868 0.48369 0.0868 0.83096 0.44648l11.782 12.291v-12.526h3.2246z" />
                    <path d="m251.49 153.95q0 0.34727-0.12403 0.64492-0.12402 0.29766-0.34726 0.5209-0.22325 0.21084-0.5209 0.33486-0.29766 0.12403-0.63252 0.12403h-7.2678q-1.0294 0-2.0836-0.22324-1.0542-0.22325-2.0464-0.68213-0.97978-0.47129-1.8479-1.1906-0.86817-0.71933-1.5255-1.6991-0.64492-0.99219-1.017-2.2572-0.37207-1.2774-0.37207-2.8401v-8.8925h3.2246v8.8925q0 1.3643 0.37207 2.3068 0.38448 0.94258 0.96739 1.5751t1.2774 0.99219 1.3146 0.5333q0.63252 0.17363 1.1038 0.22324 0.48369 0.0372 0.63252 0.0372h5.6679v-14.56h3.2246z" />
                </g>
            </g>
        </svg >

    );
}

export default Logo;