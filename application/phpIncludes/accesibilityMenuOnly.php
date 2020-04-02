<!-- user-menu -->
<div id="user-menu" class="col-lg-12" role="navigation" aria-hidden="false" aria-label="Accessibility Settings">
            <div class="row">
                <div class="col-xs-12" role="listitem">
                    <button type="button" id="centerSidebarCollapse" class="btn btn-info btn-block" aria-hidden="false">
                        <span>Accesibility<br aria-hidden="true">Settings</span>
                        <br aria-hidden="true">
                        <i class="fas fa-universal-access fa-6x menu-item"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- END user-menu -->                                                                                                                                                                                                                                                                                                                                                                                                                

      <!-- centerSidebar  -->
      <div id="centerSidebar" hidden>
            <div id="centerDismiss" >
                <button href="" id="closeCenterMenu" class="close-menu" aria-label="Close Accesibility Settings"><i class="arrow-button fas fa-arrow-left"></i> </button>
            </div>

            <div class="centerSidebar-header">
                <h3 tabindex="-1" id="accessibilitySettingsHeading" class="sidebar-heading">Accesibility Settings</h3>
            </div>

            <ul class="list-unstyled components">
                <li class="active">
                    <button href="#potentialPageMenu25" data-toggle="collapse" class="dropdown-button" aria-label="Change Font Size">Font Size</button>
                    <ul class="collapse list-unstyled" id="potentialPageMenu25">
                        <li>
                            <h3 aria-live="polite"><span id="current-font-size">Current Font Size: 1x</span> </h3>
                        </li>
                        <li id="font-settings-li">
                            <div class="row" style="display:inline-flex">
                                <div class="col-xs-4">
                                    <button  class="btn btn-primary btn-lg layout-button font-size" id="decrease-font" aria-label="Decrease Font Size">-</button>
                                </div>
                                <div class="col-xs-4">
                                    <button class="btn btn-primary btn-lg layout-button font-size" id="reset-font" aria-label="Reset Font Size">Reset Font</button>
                                </div>
                                <div class="col-xs-4">
                                    <button  class="btn btn-primary btn-lg layout-button font-size" id="increase-font" aria-label="Increase Font Size">+</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li class="active">
                    <button href="#toggleDisplayDropDown" data-toggle="collapse" class="dropdown-button" aria-label="Change Display Color">Color Scheme</button>
                    <ul class="collapse list-unstyled" id="toggleDisplayDropDown">
                        <li><button id="color-scheme-default" class="btn btn-primary btn-lg layout-button button-fix" aria-label="Change To Default Color Scheme">
                            Default Color Scheme
                        </button></li>
                        <li><button id="color-scheme-b-o-w" class="btn btn-primary btn-lg layout-button button-fix" aria-label="Change To Gray Color Scheme">
                            Gray Color Scheme
                        </button></li>
                        <li><button id="color-scheme-invert" class="btn btn-primary btn-lg layout-button button-fix" aria-label="Change To Inverse Color Scheme">
                            Inverse Color Scheme
                        </button></li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- END centerSidebar  -->

        <style>#user-menu{width:120px; padding:unset; left: 50%; transform: translate(-50%);}</style>