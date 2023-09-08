import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

class App extends LitElement {
    // constructor() {
    //     super()
    // }

    // connectedCallback() {
    //     console.log( this.render())

    //     this.classList.add("bg-darker")

    //     this.innerHTML = this.render()
    // }

    createRenderRoot() {
        return this;
    }

    render() {
        return html`

        <asset-upload-drop></asset-upload-drop>
        <tutorial-group>
            <tutorial-popover tutorial-idx="1" tutorial-title="test" tutorial-message="fsdf" target-element-id="split_col_1"></tutorial-popover>
        </tutorial-group>
            <body class="h-100 bg-dark">
        
                <div id="app"></div>
        
                <div class="container-fluid" style="height: 97vh;">
                    <div id="split_top" class="row align-items-start" style="height: 80%;">
                        <div id="split_col_1" class="bg-darker h-100 overflow-y-hidden overflow-x-hidden position-relative p-0" style="width: 30%;">
                            <div class="split-col-bar" onmousedown="startSplitColumns(1)"></div>
        
                            <div class=" h-100 w-100 overflow-y-hidden overflow-x-hidden position-absolute ">
        
                                <div class="d-flex align-items-start h-100">
                                    <div id="sidebar" class="nav flex-column nav-pills bg-dark h-100 pt-1" style="width: 2.5rem;" role="tablist" aria-orientation="vertical">
        
                                        <button class="btn-nav active" data-bs-toggle="pill" data-bs-target="#nav-home" type="button" role="tab" aria-selected="true"><span class="material-symbols-outlined">
                                            settings</span>
                                        </button>
        
                                        <button class="btn-nav" data-bs-toggle="pill" data-bs-target="#nav-draft" type="button" role="tab" aria-selected="false"><span class="material-symbols-outlined">
                                            draft</span>
                                        </button>
        
                                        <button class="btn-nav" data-bs-toggle="pill" data-bs-target="#nav-text" type="button" role="tab" aria-selected="false"><span class="material-symbols-outlined">
                                            text_fields</span>
                                        </button>
        
                                        <button class="btn-nav" data-bs-toggle="pill" data-bs-target="#nav-option" type="button" role="tab" aria-selected="false"><span class="material-symbols-outlined">
                                            extension</span>
                                        </button>
                                   
                                        <button class="btn-nav" data-bs-toggle="pill" data-bs-target="#nav-output" type="button" role="tab" aria-selected="false"><span class="material-symbols-outlined">
                                            output</span>
                                        </button>
        
        
                                        
                                    </div>
                                    <div class="tab-content overflow-y-scroll overflow-x-hidden  p-2 h-100" style="width: calc(100% - 2.5rem);">
        
        
                                      <div class="tab-pane fade show active" id="nav-home" role="tabpanel">
                                        <p class="text-secondary" ref="appVersion"></p>
        
        
                                        <input id="projectFile" type="text" class="d-none" name="">
        
                                        <div class="input-group mb-3">
                                            <input id="projectFolder" type="text" class="form-control bg-default text-light" placeholder="/" disabled>
                                            <button class="btn btn-sm btn-default text-light" onclick="NUGGET.directory.select()">프로젝트 폴더 지정</button>
                                        </div>
                                        
                                        <div class="input-group mb-3">
                                            <input id="projectDuration" type="number" class="form-control bg-default text-light" placeholder="진행초 e.g) 0" onchange="document.querySelector('element-timeline-ruler').updateRulerLength(this)" value="10">
                                            <span class="input-group-text bg-default text-light" id="basic-addon2">초</span>
                                        </div>
                                        <button class="btn btn-sm btn-default text-light mt-1" onclick="NUGGET.project.save()">프로젝트 저장</button>
                                        <button class="btn btn-sm btn-default text-light mt-1" onclick="NUGGET.project.load()">프로젝트 불러오기</button>
                                        <!-- <button class="btn btn-sm bg-primary text-light mt-1" onclick="window.electronAPI.req.progressBar.test()">PROGRESSBARTEST </button> -->
                                        <br>
        
                                        <button type="button" class="btn btn-sm btn-default text-light mt-1" data-bs-toggle="modal" data-bs-target="#shortKey">
                                            <span class="material-symbols-outlined">
                                                keyboard
                                                </span>
                                          </button>
                                          
                                        <br>
                                      </div>
        
                                      <div class="tab-pane fade" id="nav-draft" role="tabpanel" >
                                        <asset-browser></asset-browser>
                                        <asset-list></asset-list>
                                      </div>
        
                                      <div class="tab-pane fade" id="nav-text" role="tabpanel" >
                                        <div class="row px-2">
                                            <div class="col-4 d-flex flex-column bd-highlight overflow-hidden mt-1 asset" onclick="elementControlComponent.addText()">
                                                <span class="material-symbols-outlined icon-lg align-self-center"> text_fields </span>
                                                <b class="align-self-center text-ellipsis text-light text-center">텍스트</b>
                                            </div>
                                        </div>
                                      </div>
        
        
                                      <div class="tab-pane fade" id="nav-option" role="tabpanel" >
                                        <button class="btn btn-sm btn-default text-light mt-1" onclick="ipc.extTest()">익스텐션 폴더 불러오기 <span class="material-symbols-outlined icon-xs">
                                            developer_mode
                                        </span></button>
        
                                        <button class="btn btn-sm btn-default text-light mt-1" onclick="ipc.ext()">익스텐션 파일 불러오기</button>
                                        <br>
        
                                        <div id="extension_webview" class="mt-2">
                                            <!-- <webview src="https://nugget.studio/"></webview> -->
        
                                        </div>
        
        
        
        
        
                                      </div>
        
        
                                      <div class="tab-pane fade" id="nav-output" role="tabpanel" >
        
                                        <label class="form-label text-light">화질 설정</label>
                                        <br>
                                        <div class="text-light mb-2">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inputCheckBitrate" id="bitrate_row" value="1000" disabled>
                                                <label class="form-check-label">낮음</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inputCheckBitrate" id="bitrate_high" value="5000" checked>
                                                <label class="form-check-label">높음</label>
                                            </div>
                                        </div>
        
                                        <label class="form-label text-light">해상도</label>
                                        <br>
                                        <div class="text-light mb-2">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inputCheckQuality" id="quality_hd" value="1280x720" disabled>
                                                <label class="form-check-label">1280x720 HD</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inputCheckQuality" id="quality_fhd" value="1920x1080" checked>
                                                <label class="form-check-label">1080x1920 FHD</label>
                                            </div>
                                        </div>
        
                                        <button class="btn btn-blue-fill" onclick="ipc.render()">Export</button>
                                      </div>
        
                                    </div>
                                </div>
        
                            </div>
        
                        </div>
        
                        <!-- PREVIEW -->
                        <div id="split_col_2" class="h-100 position-relative d-flex align-items-center justify-content-center" style="width: 50%;">
                            <div class="split-col-bar" onmousedown="startSplitColumns(2)"></div>
        
                            <div id="videobox">
                                <div class="d-flex justify-content-center">
                                    <div id="video" class="video">
                                        <canvas id="preview" class="preview"></canvas>
                                        <element-control></element-control>
                                        <drag-alignment-guide></drag-alignment-guide>
                                    </div>
                                </div>
        
          
                            </div>
                        </div>
        
                        <!-- OPTION-->
                        <div id="split_col_3" class="bg-darker h-100 overflow-y-hidden overflow-x-hidden position-relative p-2" style="width: 20%;">
                            <input type="hidden" id="optionTargetElement" value="aaaa-aaaa-aaaa-aaaa">
        
        
                            <option-group>
                                <option-text></option-text>
                                <option-image></option-image>
                                <option-video></option-video>
                                <option-audio></option-audio>
        
                            </option-group>
        
                        </div>
                    </div>
        
            
                    <div id="split_bottom" class="row position-relative split-top align-items-end bg-darker line-top" style="height: 20%;">
                        <div class="split-bottom-bar cursor-row-resize " onmousedown="startSplitBottom()"></div>
                        <div class="row mb-2">
                            <div class="col-4">
                                <div class="d-flex justify-content-start">
                                    <button id="playToggle" class="btn btn-xs btn-transparent" onclick="elementControlComponent.play()"><span class="material-symbols-outlined icon-white icon-md"> play_circle </span></button>
                                    <button class="btn btn-xs btn-transparent ms-2" onclick="elementControlComponent.reset()"><span class="material-symbols-outlined icon-white icon-md"> replay_circle_filled </span></button>
                                    <b id="time" class="text-light ms-2">00:00:00.00</b>
                                </div>
                            </div>
                            <div class="col-5">
                                <div id="keyframeEditorButtonGroup" class="d-none">
                                    <button type="button" class="btn btn-dark btn-sm" data-bs-dismiss="offcanvas" onclick="document.querySelector('keyframe-editor').hideKeyframeEditorButtonGroup()" aria-label="close">키프레임 에디터 닫기</button>
                                    <div class="btn-group" role="group" id="timelineOptionLineEditor">
                                    </div>
                                </div>
                            </div>
        
                            <div class="col-3 row d-flex align-items-center">
                                <element-timeline-range></element-timeline-range>
                            </div>
        
                        </div>
                        <element-timeline-ruler></element-timeline-ruler>
        
                        <element-timeline id="split_inner_bottom"></element-timeline>
                    </div>
                </div>
        
        
        
                <!-- 
                    OPTION
                -->
                <div class="offcanvas offcanvas-start" data-bs-scroll="true"  data-bs-backdrop="false" tabindex="-1" id="option_top" aria-labelledby="offcanvasRightLabel" style="width: 30%;">
                    <div class="offcanvas-header">
                        <h5 id="offcanvasRightLabel" class="text-light ms-3 mt-1">옵션</h5>
                        <button type="button" class="btn btn-transparent btn-sm" data-bs-dismiss="offcanvas" aria-label="Close"><span class="material-symbols-outlined icon-white">close</span></button>
                    </div>
                    <div class="offcanvas-body">
        
        
                    </div>
                </div>
        
        
                <!-- 
                    TIMELINE OPTION
                -->
                <div class="offcanvas offcanvas-bottom" data-bs-scroll="true"  data-bs-backdrop="false" tabindex="-1" id="option_bottom" aria-labelledby="offcanvasRightLabel" style="height: calc(20% - 2rem); ">
                    <div class="offcanvas-header row d-flex justify-content-between">
                        <div class="col">
        
                        </div>
                        <div class="col text-end">
        
                        </div>
        
                    </div>
                    <div class="">
                        <input type="hidden" id="timelineOptionTargetElement" value="aaaa-aaaa-aaaa-aaaa">
        
                        <div id="timelineOptionBody" class="d-none">
        
                        </div>
        
                    </div>
                </div>
        
                <!-- 
                    MODAL
                -->
                <div>
                    <dds-modal
                    modal-id="exportVideoModal"
                    modal-title="영상 내보내기"
                    modal-subtitle="">
                        <dds-content>
                            <div class="mb-3">
                                <video id="exportVideo" controls?="controls"></video>
                            </div>
                        </dds-content>
                        <dds-modal-button button-color="btn-blue" button-text-color="text-primary" is-dismiss="false">저장</dds-modal-button>
                        <dds-modal-button button-color="btn-light" button-text-color="text-dark" is-dismiss="true">취소</dds-modal-button>
                    </dds-modal>
                    
                    
                    
                    <dds-modal
                    modal-id="progressRender"
                    modal-title="랜더링 중 이에요">
                        <dds-content>
                            <div class="mb-3">
                                <div class="progress">
                                    <div id="progress" class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                </div>
                                <b class="text-secondary"><i class="fas fa-info-circle"></i> 랜더링 100%에 도달해도 일정시간 지연될 수 있어요. </b>
                            </div>
                        </dds-content>
                        <dds-modal-button button-color="btn-light" button-text-color="text-dark" is-dismiss="true">닫기</dds-modal-button>
                    </dds-modal>
                    
                    
                    <dds-modal
                    modal-id="downloadFfmpeg"
                    modal-title="FFMPEG 다운로드중">
                        <dds-content>
                            <div class="mb-3">
                                <div class="progress">
                                    <div id="download_progress_ffmpeg" class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                </div>
                            </div>
                        </dds-content>
                        <dds-modal-button button-color="btn-light" button-text-color="text-dark" is-dismiss="true">닫기</dds-modal-button>
                    </dds-modal>
                    
                    <dds-modal
                    modal-id="progressFinish"
                    modal-title="랜더링이 완료되었어요">
                        <dds-content>
                            <div class="mb-3">
                    
                            </div>
                        </dds-content>
                        <dds-modal-button button-color="btn-blue-fill" is-dismiss="false" onclick="rendererUtil.openRenderedVideoFolder()">저장폴더 열기</dds-modal-button>
                        <dds-modal-button button-color="btn-light" button-text-color="text-dark" is-dismiss="true">닫기</dds-modal-button>
                    </dds-modal>
                    
                    <dds-modal
                    modal-id="progressError"
                    modal-title="랜더링중 문제가 발생했어요">
                        <dds-content>
                            <div class="mb-3">
                                <p id="progressErrorMsg" class="text-secondary"></p>
                    
                            </div>
                        </dds-content>
                        <dds-modal-button button-color="btn-light" button-text-color="text-dark" is-dismiss="true">닫기</dds-modal-button>
                    </dds-modal>
                    
                    
                    
                    <dds-modal
                    modal-id="whenClose"
                    modal-title="정말 프로그램을 종료할까요?"
                    modal-subtitle="변경사항은 저장되지 않아요.">
                        <dds-content>
                            <div class="mb-3">
                    
                            </div>
                        </dds-content>
                        <dds-modal-button button-color="btn-red-fill" is-dismiss="false" onclick="rendererUtil.forceClose()">네, 종료할게요</dds-modal-button>
                        <dds-modal-button button-color="btn-light" button-text-color="text-dark" is-dismiss="true">아니요</dds-modal-button>
                    </dds-modal>
        
                    <dds-modal
                    modal-id="whenTimelineChanged"
                    modal-title="저장되지 않은 변경사항이 있어요.">
                        <dds-content>
                            <div class="mb-3">
                                <p id="whenTimelineChangedMsg" class="text-secondary"></p>
                            </div>
                        </dds-content>
                        <dds-modal-button button-color="btn-light" button-text-color="text-dark" is-dismiss="true">닫기</dds-modal-button>
                    </dds-modal>
        
        
                    <div class="modal fade" id="notLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <h5 class="modal-title font-weight-lg">로그인이 필요해요.</h5>
                                    <p class="font-weight-md"></p>
                                    <div class="mb-3">
                                        <button class="btn btn-primary" onclick="auth.openLogin()">3초만에 로그인</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="modal fade" id="shortKey" data-bs-keyboard="false" tabindex="-1" >
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content bg-dark">
                                <div class="modal-body">
                                    <h5 class="modal-title text-white font-weight-lg">단축키</h5>
                                    <div class="mb-3">
                                        <table class="table table-dark ">
                                            <tbody>
                                              <tr>
                                                <th scope="row">Control C</th>
                                                <td class="text-secondary">타임라인에서 선택된 엘리먼트를 복사합니다</td>
                                              </tr>
                                              <tr>
                                                <th scope="row">Control V</th>
                                                <td class="text-secondary">복사한 엘리먼트를 타임라인에 붙혀넣습니다</td>
                                              </tr>
                                              <tr>
                                                <th scope="row">Control X</th>
                                                <td class="text-secondary">선택된 엘리먼트를 복사하고 삭제합니다</td>
                                              </tr>
                                              <tr>
                                                <th scope="row">Control D</th>
                                                <td class="text-secondary">선택된 엘리먼트를 커서를 기준으로 분할합니다</td>
                                              </tr>
                                              <tr>
                                                <th scope="row">Control O</th>
                                                <td class="text-secondary">프로젝트 파일 .ngt 를 불러옵니다</td>
                                              </tr>
                                              <tr>
                                                <th scope="row">Control S</th>
                                                <td class="text-secondary">프로젝트를 저장합니다</td>
                                              </tr>
                                              <tr>
                                                <th scope="row">Backspace</th>
                                                <td class="text-secondary">엘리먼트를 제거합니다</td>
                                              </tr>
                                              <tr>
                                                <th scope="row">Space</th>
                                                <td class="text-secondary">프리뷰를 재생하거나 중지합니다</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
        
        
                <div class="toast-container position-fixed bottom-50 start-50 translate-middle">
                    <div class="toast fade hide" id="loadMetadataToast" role="alert" data-bs-animation="true" data-bs-autohide="true" data-bs-delay="9000" aria-live="assertive" aria-atomic="true" style="background-color: rgba(37, 38, 43, 0.73);">
                        <div class="toast-body"> 
                            <div class="text-center text-light">메타데이터 불러오는중</div> 
                            <div class="progress mt-2 mb-1">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                            </div>
                        </div>
                    </div>
                </div>
        
        
        
                <div id="menuRightClick"></div>
        
                <toast-box></toast-box>
        
`
    }
}

export { App }