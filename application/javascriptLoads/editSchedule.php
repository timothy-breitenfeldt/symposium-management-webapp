
    <div id="innerContent" role="main" tabindex="-1">
    <h2>Conference Schedule</h2>
    <h2 style="display:none" id="conferenceNameHeader"></h2>
        <button id="showConferenceSchedule" onclick="onShowHiddenElementWithAria('conference-table', 'Conference Schedule')">Show/Hide Conference Schedule</button>
        <div id="conference-table" style="display:none">

                    <div id="MainConference">
                        <table id="Conference">
                            <thead>
                                <tr>
                                    <th>Name</th>
									<th>Date</th>
                                    <th>Time Start</th>
                                    <th>Time End</th>
                                    <th colspan=2>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="conferenceBody">
                            </tbody>
                        </table>
                    </div>
                </div>
            <h2>My Schedule</h2>
        <button id="showMySchedule" onclick="onShowHiddenElementWithAria('schedule-table', 'My Schedule')">Show/Hide My Schedule</button>
        <div id="schedule-table" style="display:none">

                <div id="UserConference">
                    <table id="UsersCon" >
                        <thead>
                            <tr>
                                <th>Name</th>
								<th>Date</th>
                                <th>Time Start</th>
                                <th>Time End</th>
                                <th colspan=2>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="userConInfo">
                        </tbody>
                    </table>
                </div>
        </div>