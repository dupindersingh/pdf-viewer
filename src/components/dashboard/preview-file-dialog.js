/*eslint-disable*/
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from "../app/button";

class PreviewFileDialogBox extends Component {
    closeDialog() {
        document.getElementById("previewFile").style.display = "none";
        document.getElementById("previewFile").classList.remove("in")
    }

    downloadMyImage(e, image) {
        const clearUrl = url => url.replace(/^data:image\/\w+;base64,/, '');

        const downloadImage = (name, content, type) => {
            let link = document.createElement('a');
            link.style = 'position: fixed; left -10000px;';
            link.href = `data:application/octet-stream;base64,${encodeURIComponent(content)}`;
            link.download = /\.\w+/.test(name) ? name : `${name}.${type}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
                downloadImage('download', clearUrl(image), "png");
    }

    // downloadImage(e, image){
    //     e.preventDefault();
    //     let xhr = new XMLHttpRequest();
    //     xhr.open("GET", image, true);
    //     xhr.responseType = "blob";
    //     xhr.onload = function(){
    //         let urlCreator = window.URL || window.webkitURL;
    //         let imageUrl = urlCreator.createObjectURL(this.response);
    //         let tag = document.createElement('a');
    //         tag.href = imageUrl;
    //         tag.download = "image.png";
    //         document.body.appendChild(tag);
    //         tag.click();
    //         document.body.removeChild(tag);
    //     };
    //     xhr.send();
    // }

// downloadImage(e, img) {
//   e.preventDefault();
    // let pom = document.createElement('a');
    // pom.setAttribute('href', 'data:application/octet-stream,' + encodeURIComponent("https://www.searchenginejournal.com/wp-content/uploads/2018/07/The-Smart-Marketer%E2%80%99s-Guide-to-Google-Alerts-760x400.png"));
    // pom.setAttribute('download', "https://www.searchenginejournal.com/wp-content/uploads/2018/07/The-Smart-Marketer%E2%80%99s-Guide-to-Google-Alerts-760x400.png");
    // pom.style.display = 'none';
    // document.body.appendChild(pom);
    // pom.click();
    // document.body.removeChild(pom);

    // console.log(img, "image.......");
  // img = "https://www.searchenginejournal.com/wp-content/uploads/2018/07/The-Smart-Marketer%E2%80%99s-Guide-to-Google-Alerts-760x400.png";
  //   setTimeout(() => {
  //     const response = {
  //       file: img,
  //     };
  //     window.location.href = response.file;
  //   }, 100);
// }
    render() {
        return (
            <form>
                <div className="modal fade" id="previewFile" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">{this.props.heading}</h5>
                                <button type="button" className="close" onClick={this.closeDialog.bind(this)} data-dismiss="filePreviewModal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body display-file-outer">
                                <img className="file-image-inner" src={this.props.image} alt="file"
                                     onError={() => (this.src = require("../../images/corrupt-file.png"))}/>
                            </div>
                            <div className="modal-footer">
                                <a id="download_image">
                                    <Button type="button" className="btn btn-primary"
                                    onClick={(e)=> this.downloadMyImage(e, this.props.image)}
                                            text={"Download"}/>
                                </a>
                                <a href="/projects/pdfviewerapi/public/document/242/PDF_Files/marleyuserFile/marley.png" download>
                                    <img src="/projects/pdfviewerapi/public/document/242/PDF_Files/marleyuserFile/marley.png" alt="image" width="104" height="142"/>
                                </a>
                                <button type="button" style={{marginLeft: "20px"}}
                                        className="btn btn-secondary"
                                        onClick={this.closeDialog.bind(this)}
                                        data-dismiss="filePreviewModal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {state}
}
export default withRouter(connect(mapStateToProps)(PreviewFileDialogBox))
