/**
 * Video Cutter view js class.
 *
 * @example
 * ```javascript
 * var view = new VideoCutterView(params, data);
 * ```
 * ---
 * Variables
 * ---
 * @var params
 * @var data
 *
 *
 * Methods
 * ---
 * @method init()
 * @method updateDuration()
 * @method updateCuePoint()
 * @method Clipper(source, data)
 * @method LinkAssetToMeedia(data)
 * @method loadAssets(search)
 * @method createAsset()
 * @method getManifest(startTime, featureTime)
 * @method startEncode(asset_id, profile_id)
 * @method showParents()
 * @method showClassifications()
 * @method showTypes(type)
 * @method showMetadata()
 * @method showTags(tags_id)
 * @method timeToSeconds(str)
 * @method secondsToTime(secs)
 * @method timeStringToDateTimeOrTimestamp(time_string, timestamp)
 * @method initTimeSlider(max)
 * @method setTimeSlider(from, to, duration)
 * @method initBootstrapCheckboxes()
 * @method StartLive()
 * @method ResumeLive()
 * --- Date Time methods
 * @method addHours(h)
 * @method addMinutes(m)
 * @method addSconds(s)
 * @method minusHours(h)
 * @method minusMinutes(m)
 * @method minusSeconds(s)
 *
 * @param {Object} data Instance options
 * @author Alex Toshinov <alex.toshinov@gmail.com>
 */
var VideoCutterView = function (params, data) {
    data = typeof data === 'object' ? data : {};

    //

    //
    var defaults = {
        //selectors
        'VideoRangeSliderField'   :'.video-range-slider',
        'LinkToExistingAsset'     :'#link_to_existing_asset',
        'OneHourField'            :'#one-hour',
        'AssetTypeField'          :'#asset_type',
        'StartTimeField'          :'#start_time',
        'StopTimeField'           :'#stop_time',
        'createAssetFromClipBtn'  :'#createAssetFromClipBtn',
        'overideAssetWithClipBtn' :'#overideAssetWithClipBtn',
        'createAssetModalBtn'     :'#createAssetModal',
        'linkMediaToAssetBtn'     :'#linkMediaToAssetBtn',
        'BtnSearch'               :'#BtnSearch',
        'assetsListTableContainer':'#assetsListTable',
        'videoContentContainer'   :'#videoContent',
        'LinkToField'             :'#link_to',
        'modalForm'               :'#modal_window',
        'tagsField'               :'#tags',
        'metadataField'           :'#metadata',
        'classificationField'     :'#classification',
        'classificationGroupField':'#classification_group',
        'typeField'               :'#type',
        'parentField'             :'#parent',
        'parentIdField'           :'#parent_id',
        'assetsTable'             :'#assetsTable',
        'manifestUrlField'        :'#manifest_url',
        'manifestUrlMD5Field'     :'#manifest_url_md5',
        'inputNodesField'         :'#input_nodes',
        'outputNodesField'        :'#output_nodes',
        'assetIdField'            :'#asset_id',
        'sourceIdField'           :'#source_id',
        'profileIdField'          :'#profile_id',
        'encodingAutostartField'  :'#encoding_autostart',
        'createAssetFormModal'    :'#createAssetForm',
        'videoProcessModal'       :'#videoProcessModal',
        'videoProcessModalLabel'  :'#videoProcessModalLabel',
        'progressBarVideo'        :'.progress-bar-video',
        'cuePoint'                :'.cue',
        'alertTop'                :'.alerttop',
        'alertDuration'           :'.alertduration',
        //Player
        'PlayerId'                :'video',
        'FastBackwardBtn3'        :'#fast-backward-x3',
        'FastBackwardBtn'         :'#fast-backward',
        'StepForwardBtn'          :'#step-forward',
        'playPauseBtn'            :'#playPauseBtn',
        'StepBackwardBtn'         :'#step-backward',
        'FastForwardBtn'          :'#fast-forward',
        'FastForwardBtn3'         :'#fast-forward-x3',
        'SetInPointBtn'           :'#set-in-point',
        'SetOutPointBtn'          :'#set-out-point',
        'StartLiveBtn'            :'#start-live',
        'EndLiveBtn'              :'#end-live',
        'PastTime'                :'#past_time',
        'CurrentTime'             :'#current_time',
        'GoBackBtn'               :'#go-back',
        'MediaIdField'            :'#media_id',
        'scheduleDateField'       :'#schedule-date',
        'scheduleShowField'       :'#schedule-show',

        //Ajax URLs
        'ajaxLoadScheduleUrl'     :'/livelinears/ajaxloadschedule',
        'ajaxLoadAssetsMediaUrl'  :'/assetsplayer/playlist/',
        'ajaxLoadAssetsUrl'       :'/livelinears/ajaxloadassets',
        'ajaxCreateAssetUrl'      :'/livelinears/ajaxcreateasset',
        'ajaxLoadTags'            :'/assets/tags/',
        'ajaxLoadMetadata'        :'/assets/metadata/',
        'ajaxLoadClassifications' :'/assets/classifications/',
        'ajaxLoadAssetsTypes'     :'/assets/types/',
        'ajaxLoadParents'         :'/assets/parents/',
        'ajaxMediaEncodeUrl'      :'/livelinears/encode/',
        'ajaxMediaJobsUrl'        :'/assetsmedia/jobs/',
        'ajaxlinkassettomedia'    :'/livelinears/ajaxlinkassettomedia',
        'ajaxStreamCtltUrl'       :'https://cifz1lrsx5.execute-api.us-east-2.amazonaws.com/dev/streamctl/',
        'ajaxCuttingVideo'        :'https://cifz1lrsx5.execute-api.us-east-2.amazonaws.com/dev/services/',

    };

    this.settings = $.extend({}, defaults, data);
    //

    // cached selectors
    this.$VideoRangeSliderField         = $(this.settings.VideoRangeSliderField);
    this.$LinkToExistingAsset 			= $(this.settings.LinkToExistingAsset);
    this.$OneHourField                  = $(this.settings.OneHourField);
    this.$scheduleDateField             = $(this.settings.scheduleDateField);
    this.$scheduleShowField             = $(this.settings.scheduleShowField);
    this.$AssetTypeField                = $(this.settings.AssetTypeField);
    this.$StartTimeField                = $(this.settings.StartTimeField);
    this.$StopTimeField                 = $(this.settings.StopTimeField);
    this.$createAssetFromClipBtn        = $(this.settings.createAssetFromClipBtn);
    this.$overideAssetWithClipBtn       = $(this.settings.overideAssetWithClipBtn);
    this.$createAssetModalBtn           = $(this.settings.createAssetModalBtn);
    this.$linkMediaToAssetBtn           = $(this.settings.linkMediaToAssetBtn);
    this.$modalForm                     = $(this.settings.modalForm);
    this.$createAssetFormModal          = $(this.settings.createAssetFormModal);
    this.$tagsField                     = $(this.settings.tagsField);
    this.$metadataField                 = $(this.settings.metadataField);
    this.$classificationField           = $(this.settings.classificationField);
    this.$classificationGroupField      = $(this.settings.classificationGroupField);
    this.$typeField                     = $(this.settings.typeField);
    this.$assetsListTableContainer      = $(this.settings.assetsListTableContainer);
    this.$videoContentContainer         = $(this.settings.videoContentContainer);
    this.$LinkToField                   = $(this.settings.LinkToField);
    this.$parentField                   = $(this.settings.parentField);
    this.$parentIdField                 = $(this.settings.parentIdField);
    this.$assetsTable                   = $(this.settings.assetsTable);
    this.$manifestUrlField              = $(this.settings.manifestUrlField);
    this.$manifestUrlMD5Field           = $(this.settings.manifestUrlMD5Field);
    this.$videoProcessModal             = $(this.settings.videoProcessModal);
    this.$progressBarVideo              = $(this.settings.progressBarVideo);
    this.$assetIdField                  = $(this.settings.assetIdField);
    this.$sourceIdField                 = $(this.settings.sourceIdField);
    this.$profileIdField                = $(this.settings.profileIdField);
    this.$FastBackwardBtn3              = $(this.settings.FastBackwardBtn3);
    this.$FastBackwardBtn               = $(this.settings.FastBackwardBtn);
    this.$StepForwardBtn                = $(this.settings.StepForwardBtn);
    this.$playPauseBtn                  = $(this.settings.playPauseBtn);
    this.$StepBackwardBtn               = $(this.settings.StepBackwardBtn);
    this.$FastForwardBtn                = $(this.settings.FastForwardBtn);
    this.$FastForwardBtn3               = $(this.settings.FastForwardBtn3);
    this.$SetInPointBtn                 = $(this.settings.SetInPointBtn);
    this.$SetOutPointBtn                = $(this.settings.SetOutPointBtn);
    this.$StartLiveBtn                  = $(this.settings.StartLiveBtn);
    this.$EndLiveBtn                    = $(this.settings.EndLiveBtn);
    this.$cuePoint                      = $(this.settings.cuePoint);
    this.$CurrentTime                   = $(this.settings.CurrentTime);
    this.$PastTime                      = $(this.settings.PastTime);
    this.$GoBackBtn                     = $(this.settings.GoBackBtn);
    this.$alertTop                      = $(this.settings.alertTop);
    this.$alertDuration                 = $(this.settings.alertDuration);

    this.baseXHR          = null;
    this.assetsRuleXHR    = null;
    this.dataTableInst    = null;
    this.playerInst       = null;
    this.mediaId          = $(this.settings.MediaIdField).val();

    this.playerOptions    = {
        "controls": true,
        "preload": "auto",
        "width": 640,
        "height": 480,
        "crossorigin":"anonymous",
        "poster":""
    };

    this.params             = params;
    this.asset_id           = '';
    this.videoDuration      = null;
    this.oneHour            = 0; //in secounds
    this.filename           = null;
    this.currentTime        = null;
    this.timestampFrom      = new Date().minusMinutes(10).getTime();
    this.timestampTo        = null;
    this.from               = 0;
    this.to                 = null;
    this.interval           = 10; // 10 sec
    this.seek               = 0;
    this.videoSliderIns     = null;
    this.updateCue          = false;
    this.timePickerInitData = {
        secondStep: 1,
        minuteStep: 1,
        showSeconds: true,
        showMeridian: false,
        defaultTime: false
    };

    this.scheduleDateConfig = {
        showTodayButton: true,
        format: momentPickersFormat,
        minDate: false,
        ignoreReadonly: true,
        timeZone:localStorage.getItem('myTimezone')
    };
    this.playListObj = {};

    this.init();
};

/**
 * Main class initialization method.
 */
VideoCutterView.prototype.init = function () {
    var self      = this;
    var $document = $(document);

    //Check LocalStorage
    if (typeof localStorage !== 'undefined') {
        try {
            if(localStorage.getItem('playbackrate') === null) {
                localStorage.setItem('playbackrate', 1);
            }
        } catch(e) {
            console.warn('localStorage is disabled!');
        }
    }

    if(self.params.sourceType === 'livelinears') {
        $("#schedule-date").datetimepicker(self.scheduleDateConfig);
        $("#one-hour").bootstrapSwitch("disabled", true);
    } else {
        self.$EndLiveBtn.hide();
    }

    $("#schedule-date").on('dp.change', function(e) {
        if($(this).val()) {
            self.getSchedule($("#live_linear_id").val(), $(this).val());
        }
    });
    //Schedule Programm
    $document.on('change', self.settings.scheduleShowField, function(e){
        e.preventDefault();
        self.playerInst.reset();
        var EPG = self.getScheduleData(self.$scheduleShowField.val());
        var from = new Date(EPG.dateTime);
        self.timestampFrom = new Date(EPG.dateTime).getTime();
        self.timestampTo = from.addSeconds(EPG.duration).getTime();
        self.playerInst.src([
            { type: "application/x-mpegURL", src: self.getManifest(self.timestampFrom, self.timestampTo) }
        ]);
        self.playerInst.play();
        var text = '<h4><small>Currently Playing: </small>'+ EPG.title +' '
            + EPG.dateTime +' <small>Duration:</small> '
            + self.secondsToTime(EPG.duration) +'</h4>';
        $("#scheduleNow").html(text);
        // console.log('timestampFrom: ', self.timestampFrom, 'timestampTo: ',self.timestampTo, EPG);
    });
    //Past Time from now to 23:59
    $document.on('click', self.settings.GoBackBtn, function(e){
        e.preventDefault();
        self.playerInst.reset();
        var from = new Date().minusHoursAndMunutes(self.$PastTime.val());
        self.timestampFrom = new Date().minusHoursAndMunutes(self.$PastTime.val()).getTime();
        var pastTimeSelect = Number(moment.duration(self.$PastTime.val()).asSeconds());
        var type = "disabled";
        if(pastTimeSelect > 3559) {
            $("#one-hour").bootstrapSwitch("disabled", false);
            $("#one-hour").bootstrapSwitch("state", true);
        } else {
            $("#one-hour").bootstrapSwitch("disabled", true);
            $("#one-hour").bootstrapSwitch("state", false);
        }

        if(self.oneHour > 3559) {
            self.timestampTo = from.addHours(1).getTime();
        } else {
            self.timestampTo = from.addMinutes(10).getTime();
        }
        // self.oneHour = moment.duration(self.$PastTime.val()).asSeconds();

        self.playerInst.src([
            { type: "application/x-mpegURL", src: self.getManifest(self.timestampFrom, self.timestampTo) }
        ]);
        self.playerInst.play();
        console.info('Go Back in Timestamps: ', self.timestampFrom, ' | ',self.timestampTo);
        console.log('Past Time: ', self.oneHour);
    });
    //
    self.$createAssetFormModal.attr('action',self.settings.ajaxCreateAssetUrl);
    //Get Playlist
    // self.from = new Date().getTime();
    // self.to = new Date().addHours(1).getTime();
    console.info('Start Time: ', self.timestampFrom, new Date(self.timestampFrom));
    //Init Player
    if(self.params.addLoop) {
        var addL = {
            "controlBar": {
                "currentTimeDisplay": true,
                "muteToggle": false
            },
            "fluid": false,
            "playbackRates": [0.1, 0.2, 0.5, 1, 2, 5]
        };
        self.playerOptions = $.extend({}, self.playerOptions, addL);
    }
    self.playerInst = videojs(self.settings.PlayerId, self.playerOptions);
    //Get Manifest Url
    self.playerInst.src([
        { type: "application/x-mpegURL", src: self.getManifest(self.timestampFrom) }
    ]);
    if(self.params.sourceType === 'livelinears') {
        self.playerInst.dvrseekbar();
    }

    if(self.params.addLoop) {
        self.playerInst.abLoopPlugin({
            enabled:false,          //defaults to false
            loopIfBeforeStart:false, //allow video to play normally before the loop section? defaults to true
            loopIfAfterEnd:true,    // defaults to true
            pauseAfterLooping: false,       //if true, after looping video will pause. Defaults to false
            pauseBeforeLooping: false,      //if true, before looping video will pause. Defaults to false
            createButtons: true        //defaults to true
        });
        //
        self.playerInst.hotkeys({
            volumeStep: 0.1,
            seekStep: 5,
            alwaysCaptureHotkeys: true,
            customKeys: {
                slowDownArBr: self.hotKeySpec({key:188,handler:self.speedChange(-0.1)}),       // 188 = <
                speedUp: self.hotKeySpec({key:190,handler:self.speedChange(0.1)}),        // 190 = >
                bigSlowDown: self.hotKeySpec({key:188,modifiers:{shift:true}, handler:self.speedChange(-0.5)}),
                bigSpeedUp: self.hotKeySpec({key:190,modifiers:{shift:true}, handler:self.speedChange(0.5)}),
                normalSpeedN: self.hotKeySpec({key:78,handler:function(p){p.self.playbackRate(1);}}),    // 78 = n
                smallSkipBackZ: self.hotKeySpec({key:90,handler:self.skip(-2)}),    // 90 = z
                vSmallSkipBack: self.hotKeySpec({key:90,handler:self.skip(-0.5),modifiers:{shift:true}}),
                smallSkipForward: self.hotKeySpec({key:88,handler:self.skip(2)}),    // 88 =x
                vSmallSkipForward: self.hotKeySpec({key:88,handler:self.skip(0.5),modifiers:{shift:true}}),
                startLoopA: self.hotKeySpec({key:65,handler:function(p){p.abLoopPlugin.setStart();}}),
                endLoopB: self.hotKeySpec({key:66,handler:function(p){p.abLoopPlugin.setEnd();}}),
                incLoopStart: self.hotKeySpec({key:65,modifiers:{shift:true},handler:function(p){p.abLoopPlugin.adjustStart(0.1);}}),
                decLoopStart: self.hotKeySpec({key:65,modifiers:{ctrl:true},handler:function(p){p.abLoopPlugin.adjustStart(-0.1);}}),
                incLoopEnd: self.hotKeySpec({key:66,modifiers:{shift:true},handler:function(p){p.abLoopPlugin.adjustEnd(0.1);}}),
                decLoopEnd: self.hotKeySpec({key:66,modifiers:{ctrl:true},handler:function(p){p.abLoopPlugin.adjustEnd(-0.1);}}),
                enableLoopL:self.hotKeySpec({key:76,handler:function(p){p.abLoopPlugin.toggle();}}),
                goToStartKeySqBr:self.hotKeySpec({key:219,handler:function(p){p.abLoopPlugin.goToStart();}}),
                goToEndSqBr:self.hotKeySpec({key:221,handler:function(p){p.abLoopPlugin.goToEnd();}}),
                togglePauseOnLoopK: self.hotKeySpec({key:75,handler:function(p){p.abLoopPlugin.cyclePauseOnLoopStatus();}})
            }
        });
    }

    // self.playerInst.seekButtons({
    //     forward: 50,
    //     back: 20
    // });
    setTimeout(function(){
        self.videoDuration = videojs.getPlayers()['video'].duration().toFixed(3);
        //init player from 0 time
        videojs.getPlayers()['video'].currentTime(0);
        self.videoDuration = (self.videoDuration === 0 || !_.isNaN(self.videoDuration)) ? 20:self.videoDuration;
        self.initTimeSlider(self.videoDuration);
        //autoplay
        videojs.getPlayers()['video'].play();
        self.setTimeSlider(self.from, self.to, self.videoDuration);
    }, 500);
    //Player's events
    //Get Current Time
    self.playerInst.on('timeupdate', function() {
        self.videoDuration = Number(this.duration().toFixed(3));
        if(_.isNaN(self.videoDuration)) {
            self.videoDuration = 10;
        }

        localStorage.setItem('playbackrate', self.playerInst.playbackRate());

        // console.log('Playback rate: ', localStorage.getItem('playbackrate'));
        self.currentTime = this.currentTime().toFixed(3);
        var percent = ((self.currentTime / self.videoDuration) * 100).toFixed(3);
        percent = percent <= 100 ? percent:100;
        // self.$cuePoint.attr('data-current-time', self.currentTime);
        if(!self.updateCue) {
            self.$cuePoint.css("left", percent  + '%');
        }
        self.$CurrentTime.val(self.secondsToTime(self.currentTime));
        // console.log('timeupdate duration: ',this.duration(), self.videoDuration);
        // console.log('currentTime: ',this.currentTime(),'|',self.currentTime, 'Duration: ',this.duration(),'|',self.videoDuration,' | ', percent+'%');
    });
    //Drag Playhead
    self.$cuePoint.draggable(
        {
            axis: "x",
            cursor: "move",
            containment: 'parent',
            start: function( event, ui ) {

            },
            drag: function( event, ui ) {
                self.updateCue = true;
            },
            stop: function( event, ui ) {
                self.disableLoop(self.params.addLoop);
                var $elm = $(this);
                var pos = $elm.position(),
                    parentSizes = {
                        width: $elm.parent().width()
                    };
                // console.log('convertToValue: ', self.convertToValue((pos.left/parentSizes.width) * 100));
                $elm.attr('data-current-time', self.convertToValue((pos.left/parentSizes.width) * 100));
                self.playerInst.currentTime(self.convertToValue((pos.left/parentSizes.width) * 100));
                $elm.css('left', ((pos.left/parentSizes.width) * 100) + '%');
                self.updateCue = false;
            }
        }
    );
    //
    setInterval(function(){
        self.updateDuration();
    }, 3000);
    //
    self.playerInst.on('seeking', function() {
        // console.log('Seeking: ',this.currentTime(),this.duration());
    });
    //
    self.playerInst.on('ended', function() {
        // console.log('Ended: ',this.currentTime(),this.duration());
    });
    //
    self.playerInst.on('seeked', function() {
        self.videoDuration = Number(this.duration().toFixed(3)) + self.oneHour;
        // console.log('Seeked: ',this.currentTime(),this.duration(), parseInt(self.videoDuration));
    });
    //Play event
    self.playerInst.on('play', function() {
        var playbackrate = localStorage.getItem('playbackrate');
        self.playerInst.playbackRate(playbackrate);
        $(".vjs-playback-rate-value").text(playbackrate + 'x');
        self.$PastTime.removeAttr('disabled');
        $("#playPauseBtn").removeClass("btn-primary");
        $("#playPauseBtn > i").removeClass("fa-play");
        $("#playPauseBtn").addClass("btn-success");
        $("#playPauseBtn > i").addClass("fa-pause");
    });
    //Pause event
    self.playerInst.on('pause', function() {
        $("#playPauseBtn").removeClass("btn-success");
        $("#playPauseBtn > i").removeClass("fa-pause");
        $("#playPauseBtn").addClass("btn-primary");
        $("#playPauseBtn > i").addClass("fa-play");
    });
    //Fast Backward x3
    $document.on("click", self.settings.FastBackwardBtn3, function(e) {
        self.disableLoop(self.params.addLoop);
        var ct = self.playerInst.currentTime();
        //Get or set the current time (in seconds)
        self.playerInst.currentTime(ct - 60 * 3); //3 minute back
    });
    //Fast Backward
    $document.on("click", self.settings.FastBackwardBtn, function(e) {
        self.disableLoop(self.params.addLoop);
        var ct = self.playerInst.currentTime();
        //Get or set the current time (in seconds)
        self.playerInst.currentTime(ct - 60); //1 minute back
    });
    //Step Forward
    $document.on("click", self.settings.StepForwardBtn, function(e) {
        self.disableLoop(self.params.addLoop);
        var ct = self.playerInst.currentTime();
        self.playerInst.currentTime(ct + 1/30);
    });
    //Play | Pause Button
    $document.on("click", self.settings.playPauseBtn, function(e) {
        if(self.$playPauseBtn.hasClass('btn-primary')) {
            self.playerInst.play();
        } else {
            self.playerInst.pause();
        }
    });
    //Step Backward
    $document.on("click", self.settings.StepBackwardBtn, function(e) {
        self.disableLoop(self.params.addLoop);
        var ct = self.playerInst.currentTime();
        self.playerInst.currentTime(ct - 1/30);
    });
    //Fast Forward
    $document.on("click", self.settings.FastForwardBtn, function(e) {
        self.disableLoop(self.params.addLoop);
        var ct = self.playerInst.currentTime();
        self.playerInst.currentTime(ct + 60); // 1 minute forward
    });
    //Fast Forward x3
    $document.on("click", self.settings.FastForwardBtn3, function(e) {
        self.disableLoop(self.params.addLoop);
        var ct = self.playerInst.currentTime();
        self.playerInst.currentTime(ct + 60 * 3); // 3 minute forward
    });
    //
    if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
        // console.log('params: ', self.params);
    }
    //init Bootstrap Checkboxes
    self.initBootstrapCheckboxes();
    //One Hour
    self.$OneHourField.on('switchChange.bootstrapSwitch', function(event, state) {
        if(state) {
            self.oneHour = 3600;
        } else {
            self.oneHour = 0;
        }
    });
    //clone recipiend field
    self.$LinkToExistingAsset.on('switchChange.bootstrapSwitch', function(event, state) {
        if(state) {
            self.$linkMediaToAssetBtn.show();
            self.$createAssetFromClipBtn.hide();
            if(self.params.sourceType === 'VOD') {
                self.$overideAssetWithClipBtn.hide();
            }
            self.$videoContentContainer.removeClass('col-md-12');
            self.$videoContentContainer.addClass('col-md-9');
            self.$assetsListTableContainer.show();
            $(".cont").find(".btn").removeClass("btn-sm");
            $(".cont").find(".btn").addClass("btn-xs");
            self.$LinkToField.val(1);

        } else {
            self.$linkMediaToAssetBtn.hide();
            self.$createAssetFromClipBtn.show();
            if(self.params.sourceType === 'VOD') {
                self.$overideAssetWithClipBtn.show();
            }
            self.$videoContentContainer.removeClass('col-md-9');
            self.$videoContentContainer.addClass('col-md-12');
            self.$assetsListTableContainer.hide();
            $(".cont").find(".btn").removeClass("btn-xs");
            $(".cont").find(".btn").addClass("btn-sm");
            self.$LinkToField.val(0);
        }
    });
    //Check for linket assets
    if(self.$LinkToField.val() === "1") {
        self.$linkMediaToAssetBtn.show();
        self.$createAssetFromClipBtn.hide();
        if(self.params.sourceType === 'VOD') {
            self.$overideAssetWithClipBtn.hide();
        }
        self.$videoContentContainer.removeClass('col-md-12');
        self.$videoContentContainer.addClass('col-md-9');
        self.$assetsListTableContainer.show();
        $(".cont").find(".btn").removeClass("btn-sm");
        $(".cont").find(".btn").addClass("btn-xs");
        self.$LinkToExistingAsset.bootstrapSwitch('state',true);
    }
    //init timePickers
    self.$StartTimeField.timepicker(self.timePickerInitData);
    //
    self.$StopTimeField.timepicker(self.timePickerInitData);
    //
    self.$PastTime.timepicker({
        minuteStep: 1,
        showSeconds: false,
        showMeridian: false,
        defaultTime: false
    });
    //
    self.$VideoRangeSliderField.on("change", function () {
        self.$StartTimeField.val($(".irs-from").text());
        self.$StopTimeField.val($(".irs-to").text());
        var $this = $(this),
            value = $this.prop("value").split(";");
        self.from = value[0]; self.to = value[1];

        if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
            //Disable Loop before setTimeSlider
            self.disableLoop(self.params.addLoop);
        }
    });
    //
    self.loadAssets();
    //Create New Asset
    $document.on("click", self.settings.createAssetModalBtn, function(e) {
        self.createAsset();
    });
    //Open Modal for new Asset
    $document.on("click", self.settings.createAssetFromClipBtn, function(e) {
        var asset_type = self.$AssetTypeField.val();
        self.$modalForm.modal();
    });
    //Overide asset with clip
    $document.on("click", self.settings.overideAssetWithClipBtn, function(e) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this media source!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Your media source is overide.!", {
                        icon: "success",
                    });
                    self.asset_id = $("#asset_id").val();
                    if(typeof self.asset_id === 'undefined' || self.asset_id === '') {
                        self.$alertTop.fadeToggle(350); //Notification alert
                        return;
                    } else {
                        self.ClipperVOD(self.params.input_url, 'Yes');
                    }
                } else {
                    swal("Your imaginary media source is safe!");
                }
            });
    });
    //Show Classifications
    self.showClassifications();
    //Show Tags
    self.showTags(self.params.tags_id);
    //
    self.$StartTimeField.timepicker().on('changeTime.timepicker',function(e){
        self.disableLoop(self.params.addLoop);
        self.setTimeSlider(self.timeToSeconds(e.time.value),self.timeToSeconds(self.$StopTimeField.val()));
    });
    //
    self.$StopTimeField.timepicker().on('changeTime.timepicker', function(e) {
        self.disableLoop(self.params.addLoop);
        self.setTimeSlider(self.timeToSeconds(self.$StartTimeField.val()), self.timeToSeconds(e.time.value));
    });
    //Select Asset for link
    $document.on("click", 'input[type="checkbox"]', function(e){
        var boxes = $(".checkbox-asset");
        boxes.not(this).attr('checked', false);
        $("#asset_id").val($(this).val());
        self.asset_id = $(this).val();
    });
    //
    self.$assetsTable.on('click', 'tbody td, thead th:first-child', function(e){
        $(this).parent().find('input[type="checkbox"]').trigger('click');
    });
    //
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");
        if(target === '#metadataTab') {
            $("#nextTab").hide();
            $("#createAssetModal").show();
            $("#metadata-tab").addClass('active');
            $("#settings-tab").removeClass('active');
        } else {
            $("#nextTab").show();
            $("#createAssetModal").hide();
            $("#metadata-tab").removeClass('active');
            $("#settings-tab").addClass('active');
        }
    });
    //
    $document.on("change", self.settings.classificationGroupField, function(e) {
        self.showClassifications();
    });
    //
    $document.on("change", self.settings.classificationField, function(e) {
        self.showTypes(self.params.type);
        self.showParents();
    });
    //
    $document.on("change", self.settings.typeField, function(e) {
        self.showMetadata();
    });
    //
    $document.on("change", self.settings.parentField, function(e) {
        self.$parentField.val($(this).val());
    });
    //
    $('#status option:contains("Active")').text('Approved');
    $('#status option:contains("Inactive")').text('Under Review');
    //
    $document.on("click", "#addStreamBtn", function(e) {
        var data = {
            name:'Test livelinear',
            url: self.$manifestUrlField.val()
        }
        self.addStream(data);
    });
    //Video Player Controls
    $document.on("click", "#start-plus-10", function(e) {
        e.preventDefault();
        self.disableLoop(self.params.addLoop);
        self.setTimeSlider(self.timeToSeconds(self.$StartTimeField.val()) + 1 , self.timeToSeconds(self.$StopTimeField.val()),self.videoDuration);
    });
    //
    $document.on("click", "#start-minus-10", function(e) {
        e.preventDefault();
        self.disableLoop(self.params.addLoop);
        self.setTimeSlider(self.from - 1 , self.timeToSeconds(self.$StopTimeField.val()),self.videoDuration);
    });
    //
    $document.on("click", "#start-pt", function(e) {
        e.preventDefault();
        if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
            videojs.getPlayers()['video'].currentTime(self.from);
            self.enableLoop(self.params.addLoop, self.from, self.to);
            videojs.getPlayers()['video'].play();
            if(videojs.getPlayers()['video'].currentTime() === self.to) {
                videojs.getPlayers()['video'].pause();
            }
        }
    });
    //
    $document.on("click", "#end-pt", function(e) {
        e.preventDefault();
        if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
            self.disableLoop(self.params.addLoop);
            videojs.getPlayers()['video'].currentTime(self.to);
            videojs.getPlayers()['video'].pause();
        }
    });
    //
    $document.on("click", "#end-plus-10", function(e) {
        e.preventDefault();
        self.disableLoop(self.params.addLoop);
        self.setTimeSlider(self.from, self.timeToSeconds(self.$StopTimeField.val()) + 1,self.videoDuration);
    });
    //
    $document.on("click", "#end-minus-10", function(e) {
        e.preventDefault();
        self.disableLoop(self.params.addLoop);
        self.setTimeSlider(self.from, self.to - 1,self.videoDuration);
    });
    //Set In Point
    $document.on("click", self.settings.SetInPointBtn, function(e) {
        // e.preventDefault();
        if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
            self.from = videojs.getPlayers()['video'].currentTime().toFixed(3);
            self.to = videojs.getPlayers()['video'].duration().toFixed(3);
            console.info('Set In Point: ',self.from, self.to, self.videoDuration);
            self.disableLoop(self.params.addLoop);
            self.setTimeSlider(self.from, self.to ,self.videoDuration);
        }
    });
    //Set Out Point
    $document.on("click", self.settings.SetOutPointBtn, function(e) {
        // e.preventDefault();
        if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
            self.to = videojs.getPlayers()['video'].currentTime().toFixed(3);
            console.info('Set Out Point: ',self.to);
            self.setTimeSlider(self.from, self.to ,self.videoDuration);
            self.enableLoop(self.params.addLoop, self.from, self.to);
        }
    });
    //Start Live
    $document.on("click", self.settings.StartLiveBtn, function(e) {
        e.preventDefault();
        //Clear Time Mashine
        self.$PastTime.val('00:00');
        $("#one-hour").bootstrapSwitch("disabled", true);
        self.StartLive();
    });
    //End Live
    $document.on("click", self.settings.EndLiveBtn, function(e) {
        e.preventDefault();
        //Clear Time Mashine
        self.$PastTime.val('00:00');
        self.ResumeLive();
    });
    //
    $document.on("click", self.settings.BtnSearch, function(e) {
        e.preventDefault();
        self.$assetsTable.DataTable().destroy();
        self.loadAssets($("#q").val());
    });
    //
    $document.on("click", self.settings.linkMediaToAssetBtn, function(e) {
        e.preventDefault();
        self.asset_id = $(".checkbox-asset:checked").val();
        if(typeof self.asset_id === 'undefined' || self.asset_id === '') {
            self.$alertTop.fadeToggle(350); //Notification alert
            return;
        } else {
            //Validation duration
            if((self.to - self.from) === 0) {
                self.$alertDuration.fadeToggle(350); //Notification alert
                return;
            }
            self.$alertTop.alert();
            self.$alertDuration.alert();
            switch(self.params.sourceType) {
                case 'VOD':
                    self.ClipperVOD(self.params.input_url);
                    break;
                case 'livelinears':
                    var dataUrl = {
                        from: self.timeStringToDateTimeOrTimestamp(self.secondsToTime(self.from), true),
                        to: self.timeStringToDateTimeOrTimestamp(self.secondsToTime(self.to), true),
                        id: self.$manifestUrlMD5Field.val(),
                        service: 'playlist'
                    };

                    self.timestampTo = (self.timestampTo === null) ? new Date().getTime():self.timestampTo;

                    var dataObj = {
                        url:self.settings.ajaxCuttingVideo + 'playlist/' + self.$manifestUrlMD5Field.val() + '/' + self.timestampFrom + '/' + self.timestampTo ,
                        filename: dataUrl.from + dataUrl.id + dataUrl.to + '.ts',
                        bucket: self.params.bucket,
                        seek: self.from,
                        duration: self.to - self.from
                    }
                    self.filename = dataUrl.from + dataUrl.id + dataUrl.to + '.ts';
                    self.Clipper('clip',dataObj);
                    break;
            }

        }
    });
    //Keyboard controls
    $("#videoContainer").bind("keydown",function(e){
        e.preventDefault();
        var keyCode = e.keyCode || e.which;
        switch (keyCode) {
            case 37: // LEFT
                self.setTimeSlider(self.from, self.to - 1 ,self.videoDuration);
                break;
            case 39: // RIGHT
                self.setTimeSlider(self.from, self.to + 1 ,self.videoDuration);
                break;
            case 73: //I
                if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
                    self.from = videojs.getPlayers()['video'].currentTime();
                    if(self.to <= self.from) {
                        self.to = self.from + self.interval;
                    }
                    self.setTimeSlider(self.from, self.to ,self.videoDuration);
                } else {
                    setMessage('Please press Play button.', "#fff", "blue", "top-right");
                }
                break;
            case 69: //E
                if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
                    self.to = videojs.getPlayers()['video'].currentTime();
                    self.setTimeSlider(self.from, self.to ,self.videoDuration);
                }
                break;
            case 188: // <
                self.setTimeSlider(self.from - 1, self.to ,self.videoDuration);
                break;
            case 190: // >
                self.setTimeSlider(self.from + 1, self.to ,self.videoDuration);
                break;
            case 109: // -
                var ct = self.playerInst.currentTime();
                self.playerInst.currentTime(ct - 1/30);
                break;
            case 107: // +
                var ct = self.playerInst.currentTime();
                self.playerInst.currentTime(ct + 1/30);
                break;
            case 13: // Enter - Play/Pause
                if(self.playerInst.paused()) {
                    self.playerInst.play();
                } else {
                    self.playerInst.pause();
                }
                break;
            case 36: //Home
                if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
                    videojs.getPlayers()['video'].currentTime(0);
                }
                break;
            case 35: //End
                if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
                    videojs.getPlayers()['video'].play();
                    var duration = videojs.getPlayers()['video'].duration();
                    videojs.getPlayers()['video'].currentTime(duration);
                }
                break;
        }
        // console.log(keyCode);
    });
    //Loading Overlay for all ajax
    $document.ajaxSend(function(event, jqxhr, settings){
        $.LoadingOverlay("show", self.params.loader);
    });
    //
    $document.ajaxComplete(function(event, jqxhr, settings){
        $.LoadingOverlay("hide");
    });
    //
    // console.log('Node: ',self.params.bucket);
    //
};
/**
 * Resume Live.
 */
VideoCutterView.prototype.getResumeTime = function (timestamp) {
    var self = this;
    //
    console.log('ResumeLive time: ', timestamp);
    //
    self.disableLoop(self.params.addLoop);
    if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
        self.playerInst.src([
            { type: "application/x-mpegURL", src: self.getManifest(timestamp) }
        ]); //
        self.playerInst.on('loadedmetadata', function() {
            self.playerInst.currentTime(self.videoDuration);
        });
        self.playerInst.play();
    }
};

/**
 * Start Playing from begining.
 */
VideoCutterView.prototype.StartLive = function () {
    var self = this;
    self.disableLoop(self.params.addLoop);
    if (typeof videojs === 'function' && videojs.getPlayers()['video']) {
        self.playerInst.src([
            { type: "application/x-mpegURL", src: self.getManifest(self.timestampFrom) }
        ]);
        self.playerInst.on('loadedmetadata', function() {
            self.playerInst.currentTime(1);
        });
        self.playerInst.playbackRate(localStorage.getItem('playbackrate'));
        self.playerInst.play();
    }
};
/**
 * Update Duration.
 */
VideoCutterView.prototype.updateDuration = function () {
    var self = this;
    slider = self.$VideoRangeSliderField.data("ionRangeSlider");
    slider.update({
        max: self.videoDuration,
    });
};
/**
 * Update Playhead.
 */
VideoCutterView.prototype.updateCuePoint = function () {
    var self = this;
    var percent = ((self.currentTime / self.videoDuration) * 100).toFixed(2);
    percent = percent <= 100 ? percent:100;
    self.$cuePoint.css("left", percent + '%');
};
/**
 * Link Asset to media.
 */
VideoCutterView.prototype.LinkAssetToMeedia = function (data) {
    var self = this;
    self.baseXHR = $.ajax({
        'url':    self.settings.ajaxlinkassettomedia,
        'method': 'POST',
        'dataType': 'json',
        'data': data,
    })
        .done(function (res) {
            self.startEncode(self.asset_id, self.params.profile_id);
        });
};
/**
 * Load Assets on sidebar.
 */
VideoCutterView.prototype.loadAssets = function (search='') {
    var self = this;
    self.dataTableInst = self.$assetsTable.dataTable({
        ajax: self.settings.ajaxLoadAssetsUrl + '?q='+search,
        "bScrollInfinite": true,
        "bLengthChange": false,
        searching:  false,
        ordering:   false,
        processing: true,
        serverSide: true,
        paging: true,
        columns: [
            { data: "id", className:"p-l-10 vertical-middle cell-min-width" },
            { data: 'title' },

        ]
    });
};
/**
 * Create Asset
 */
VideoCutterView.prototype.createAsset = function () {
    var self = this;
    //Validation metadata Name
    if($("#metadata-Name").val().length === 0) {
        console.warn('Name field is empty!.');
        $("#metadata-Name").parent().addClass('has-error');
        $("#metadata-Name").parent().find('label').css('color','red');
        return;
    }
    //Validation duration
    if((self.to - self.from) === 0) {
        self.$alertDuration.fadeToggle(350); //Notification alert
        self.$modalForm.modal('hide');
        return;
    }
    //
    if (self.baseXHR && self.baseXHR.readyState !== 4) {
        self.baseXHR.abort();
    }
    //
    self.$alertDuration.alert();
    //
    self.baseXHR = $.ajax({
        'url':    self.settings.ajaxCreateAssetUrl,
        'method': 'POST',
        'dataType': 'json',
        'data': self.$createAssetFormModal.serialize()
    })
        .done(function (res) {
            if(res.success) {
                self.asset_id = res.out.asset_id;
                document.getElementById("createAssetForm").reset();
                self.$modalForm.modal('hide');
                switch(self.params.sourceType) {
                    case 'VOD':
                        self.ClipperVOD(self.params.input_url);
                        break;
                    case 'livelinears':
                        var dataUrl = {
                            from: self.timeStringToDateTimeOrTimestamp(self.secondsToTime(self.from), true),
                            to: self.timeStringToDateTimeOrTimestamp(self.secondsToTime(self.to), true),
                            id: self.$manifestUrlMD5Field.val(),
                            service: 'playlist'
                        };

                        self.timestampTo = (self.timestampTo === null) ? new Date().getTime():self.timestampTo;

                        var dataObj = {
                            url:self.settings.ajaxCuttingVideo + 'playlist/' + self.$manifestUrlMD5Field.val() + '/' + self.timestampFrom + '/' + self.timestampTo ,
                            filename: dataUrl.from + dataUrl.id + dataUrl.to + '.ts',
                            bucket: self.params.bucket,
                            seek: self.from,
                            duration: self.to - self.from
                        }
                        self.filename = dataUrl.from + dataUrl.id + dataUrl.to + '.ts';
                        self.Clipper('clip',dataObj);
                        break;
                        setMessage(res.message, "#fff", "green", "top-right");
                }

            }

        })
        .always(function() {
            $("#metadata-Name").removeClass('has-error');
            $("#metadata-Name").parent().find('label').css('color','#686868');
        });
};
/**
 * BootstrapCheckboxes initialization.
 */
VideoCutterView.prototype.initBootstrapCheckboxes = function () {
    $(this.settings.LinkToExistingAsset).bootstrapSwitch("destroy");
    $(this.settings.LinkToExistingAsset).bootstrapSwitch();
    $(this.settings.OneHourField).bootstrapSwitch("destroy");
    $(this.settings.OneHourField).bootstrapSwitch();
};
/**
 * Set Time Slider and update Playhead.
 * @param {Integer} from
 * @param {Integer} to
 * @param {Integer} max: duration
 */
VideoCutterView.prototype.setTimeSlider = function (from, to, duration) {
    var self = this;
    var slider;
    self.$VideoRangeSliderField.ionRangeSlider({
        type: "double",
        grid: true,
        to_shadow: true,
        from_shadow: true,
        force_edges: true,
        drag_interval: true,
        prettify: function (num) {
            return self.secondsToTime(num);
        }
    });
    //
    slider = self.$VideoRangeSliderField.data("ionRangeSlider");
    if(to > 0 && from < to) {
        slider.update({
            max: duration,
            from:from,
            step:0.1001,
            to:to
        });
    }

    //Update Cue Point
    if(!self.updateCue) {
        self.updateCuePoint();
    }
};
//
/**
 * Init Time Slider.
 * @param {Integer} max
 */
VideoCutterView.prototype.initTimeSlider = function (max = 30) {
    var self = this;
    self.videoSliderIns = self.$VideoRangeSliderField.ionRangeSlider({
        type: "double",
        min: 0,
        max: max,
        from:0,
        to:20,
        step:0.1001,
        grid: true,
        from_shadow: true,
        to_shadow: true,
        force_edges: true,
        drag_interval: true,
        prettify: function (num) {
            return self.secondsToTime(num);
        },
        onChange: function (data) {
            // console.log(data);
        }
    });
};
//Time methods
Date.prototype.addHours = function(h){
    this.setHours(this.getHours() + h);
    return this;
};
//
Date.prototype.addMinutes = function(m){
    this.setMinutes(this.getMinutes() + m);
    return this;
};
//
Date.prototype.addSeconds = function(s){
    this.setSeconds(this.getSeconds() + s);
    return this;
};
//
Date.prototype.minusHours = function(h){
    this.setHours(this.getHours() - h);
    return this;
};
//
Date.prototype.minusMinutes = function(m){
    this.setMinutes(this.getMinutes() - m);
    return this;
};
//
Date.prototype.minusSeconds = function(s){
    this.setSeconds(this.getSeconds() - s);
    return this;
};
//
Date.prototype.minusHoursAndMunutes = function(time_string) {
    var parts = time_string.split(":");
    if(parts.length < 2) {
        time_string = "00:" + time_string;
        parts = time_string.split(":");
    }
    //
    this.setHours(this.getHours() - parseInt(parts[0]));
    this.setMinutes(this.getMinutes() - parseInt(parts[1]));
    return this;
};

/**
 * Convert Time string to DateTime Or Timestamp.
 * @param {String} time_string
 * @param {Boolean} timestamp
 * @return {String|Timestamp} DateTime/Timestamp
 */
VideoCutterView.prototype.timeStringToDateTimeOrTimestamp = function(time_string, timestamp = false) {
    var oDate = new Date();
    var parts = time_string.split(":");
    if(parts.length < 3) {
        time_string = "00:" + time_string;
        parts = time_string.split(":");
    }
    oDate.setHours(parts[0]);
    oDate.setMinutes(parts[1]);
    oDate.setSeconds(parts[2]);
    if(timestamp) {
        return oDate.getTime();
    } else {
        return moment(oDate).format();
    }
};
/**
 * Convert Seconds to Time.
 * @param {Integer} secs
 * @return {String} Time
 */
VideoCutterView.prototype.secondsToTime = function(secs) {
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
/**
 * Convert Time String To Seconds.
 * @param {String} str
 * @return {Integer} Seconds
 */
VideoCutterView.prototype.timeToSeconds = function(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}
/**
 * Show Tags.
 * @return {HTML}
 */
VideoCutterView.prototype.showTags = function(tags_id) {
    var self = this;
    self.$tagsField.load(self.settings.ajaxLoadTags + tags_id);
};
/**
 * Show Metadata.
 * @return {HTML}
 */
VideoCutterView.prototype.showMetadata = function () {
    var self = this;
    var key, data = [];
    var params = "?id=tags_id&classification=" + self.$classificationField.val() + "&type=" + self.$typeField.val();

    if (typeof metadataIdList !== 'undefined') {
        for (key in metadataIdList) {
            if (typeof $('input[name="metadata['+metadataIdList[key]+']"]').val() !== 'undefined') {
                data.push("metadata["+metadataIdList[key]+"]="+$('input[name="metadata['+metadataIdList[key]+']"]').val());
            }
            if (typeof $('textarea[name="metadata['+metadataIdList[key]+']"]').val() !== 'undefined') {
                data.push("metadata["+metadataIdList[key]+"]="+$('textarea[name="metadata['+metadataIdList[key]+']"]').val());
            }
        }
        if (data.length > 0) {
            params = params + '&'+ data.join('&');
        }
    }

    self.$metadataField.load(self.settings.ajaxLoadMetadata + params);
};
/**
 * Show Types.
 * @return {HTML}
 */
VideoCutterView.prototype.showTypes = function (type) {
    var self = this;
    var firstType = true;
    self.$typeField.load(self.settings.ajaxLoadAssetsTypes + "?classification=" + self.$classificationField.val(), '', function () {
        if (firstType) {
            if (type > 0) {
                self.$typeField.val(type);
            }
            firstType = false;
        } else {
            self.$typeField.val($(this.settings.typeField + "option:first").val());
        }
        if(self.params.action && $(this.settings.typeField + "option:contains('Video')").length === 1) {
            self.$typeField.val(1).attr("selected", "selected");
        }
        self.showMetadata();
    });
    return false;
};
/**
 * Show Classifications.
 * @return {HTML}
 */
VideoCutterView.prototype.showClassifications = function() {
    var self = this;
    self.$classificationField.load(self.settings.ajaxLoadClassifications + "?group_id=" + self.$classificationGroupField.val(), '', function() {
        if (classification > 0) {
            self.$classificationField.val(classification);
        }
        self.showTypes();
    });
    return false;
};
/**
 * Show Parents.
 * @return {HTML}
 */
VideoCutterView.prototype.showParents = function () {
    var self = this;
    self.$parentField.children().remove();
    if (null === self.$classificationField.val()) {
        return;
    }
    self.$parentField.load(self.settings.ajaxLoadParents + "?classification=" + self.$classificationField.val(), '', function() {
        if (!self.$parentField.val(self.$parentIdField.val()).val()) {
            self.$parentField.val(0);
            self.$parentIdField.val(0);
        }
    });
};
/**
 * Encode Media.
 * @param {String} asset_id
 * @param {Integer} profile_id
 * @return {HTML} #jobsList
 */
VideoCutterView.prototype.startEncode = function (asset_id, profile_id) {
    var self = this;
    if(typeof asset_id === 'undefined' || asset_id === '') {
        setMessage("Error: Please create new asset or link existing!", "#fff", "red", "top-right");
        return;
    }

    if(typeof profile_id === 'undefined') {
        profole_id = 0; //HLS
    }

    self.baseXHR = $.ajax({
        type: "POST",
        url:  self.settings.ajaxMediaEncodeUrl + asset_id,
        dataType: "json",
        data : {
            profile_id : profile_id
        },
        success : function(res) {
            if (res.error === true) {
                if(res.messages) {
                    if(res.messages.length > 0) {
                        setMessage("Error : " + res.messages[0], "#fff", "red", "top-right");
                    }
                } else {
                    setMessage("Error", "#fff", "red", "top-right");
                }
            }
            else {
                var job_id = res['job_id'];
                var source_id = res['source_id'];
                // TODO
                $( "#jobsList" ).load( "/assetsmedia/jobs/" + source_id + "/" + job_id + "?rnd=" + Math.random() );
            }
        },
        error : function(res, status, error) {
            if(res.responseJSON) {
                if(res.responseJSON.messages.length > 0) {
                    setMessage("Error : " + res.responseJSON.messages[0], "#fff", "red", "top-right");
                }
                else {
                    setMessage("Error : " + error, "#fff", "red", "top-right");
                }
            }
        }
    });
};
/**
 * Get Manifest URL
 * @param {Number|Boolean} featureTime: Timestamp/life
 * @param {Timestamp} startTime
 * @return {String} Manifest Url
 */
VideoCutterView.prototype.getManifest = function (startTime, featureTime = false) {
    var self = this;
    switch(self.params.sourceType) {
        case 'VOD':
            return self.settings.ajaxLoadAssetsMediaUrl + self.mediaId + '/play.m3u8';
            break;
        case 'livelinears':
            if(featureTime) {
                return self.settings.ajaxCuttingVideo
                    + 'playlist/'
                    + self.$manifestUrlMD5Field.val()
                    + '/'
                    + startTime
                    + '/'
                    + featureTime;
            } else {
                return self.settings.ajaxCuttingVideo
                    + 'playlist/'
                    + self.$manifestUrlMD5Field.val()
                    + '/'
                    + startTime
                    + '/live';
            }
            break;
        case 'liveevents':

            break;
            defaults:
                if(featureTime) {
                    return self.settings.ajaxCuttingVideo
                        + 'playlist/'
                        + self.$manifestUrlMD5Field.val()
                        + '/'
                        + startTime
                        + '/'
                        + featureTime;
                } else {
                    return self.settings.ajaxCuttingVideo
                        + 'playlist/'
                        + self.$manifestUrlMD5Field.val()
                        + '/'
                        + startTime
                        + '/live';
                }
            break;
    }

};
/**
 * Clipper
 * @param {Object} data
 * @param {String} sourse
 * @return {Object} playlistPath...
 */
VideoCutterView.prototype.Clipper = function (source, data) {
    var self = this;
    data.asset_id = self.asset_id;
    data.input_node_id = 1;
    data.output_node_id = 2;
    data.name = self.asset_id;
    var inputData = JSON.stringify(data);

    self.baseXHR = $.ajax({
        'url':    self.settings.ajaxCuttingVideo + source,
        'method': 'POST',
        'dataType': 'json',
        'data': inputData
    })
        .done(function (res) {
            if(res.success) {
                $.toast({
                    text : "<strong>Processing. The new video piece will be ready shortly.</strong><br />" +
                    " AssetID: "+self.asset_id,
                    showHideTransition : 'slide',  // It can be plain, fade or slide
                    bgColor : '#348a25',              // Background color for toast
                    textColor : '#fcfffa',            // text color
                    allowToastClose : false,       // Show the close button or not
                    hideAfter : 5000,              // `false` to make it sticky or time in miliseconds to hide after
                    stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
                    textAlign : 'center',            // Alignment of text i.e. left, right, center
                    position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
                });
            }
        });

};
/**
 * Clipper for VOD
 * @param {String} folder
 * @return {Object} playlistPath...
 */
VideoCutterView.prototype.ClipperVOD = function (input_url, overide = 'No') {
    var self = this;
    self.LinkAssetToMeedia({
        'asset_id'      :self.asset_id,
        'overide'       :overide,
        'key'           :input_url,
        'input_node_id' :self.params.input_node_id,
        'output_node_id':self.params.output_node_id,
        'clip_start'    :self.from,
        'clip_duration' :self.to - self.from
    });
};
/**
 * Convert percent to real values
 *
 * @param percent {Number} X in percent
 * @returns {Number} X in real
 */
VideoCutterView.prototype.convertToValue = function (percent) {
    var self = this;
    var min = 0,
        max = self.videoDuration,
        min_decimals = min.toString().split(".")[1],
        max_decimals = max.toString().split(".")[1],
        min_length, max_length,
        avg_decimals = 0,
        abs = 0, step = 1;

    if (percent === 0) {
        return 0;
    }
    if (percent === 100) {
        return self.videoDuration;
    }


    if (min_decimals) {
        min_length = min_decimals.length;
        avg_decimals = min_length;
    }
    if (max_decimals) {
        max_length = max_decimals.length;
        avg_decimals = max_length;
    }
    if (min_length && max_length) {
        avg_decimals = (min_length >= max_length) ? min_length : max_length;
    }

    if (min < 0) {
        abs = Math.abs(min);
        min = +(min + abs).toFixed(avg_decimals);
        max = +(max + abs).toFixed(avg_decimals);
    }

    var number = ((max - min) / 100 * percent) + min,
        string = step.toString().split(".")[1],
        result;

    if (string) {
        number = +number.toFixed(string.length);
    } else {
        number = number / step;
        number = number * step;

        number = +number.toFixed(0);
    }

    if (abs) {
        number -= abs;
    }

    if (string) {
        result = +number.toFixed(string.length);
    } else {
        result = self.toFixed(number);
    }

    if (result < min) {
        result = min;
    } else if (result > max) {
        result = max;
    }

    return result;
};
//
VideoCutterView.prototype.toFixed = function (num) {
    num = num.toFixed(9);
    return +num;
};
//
VideoCutterView.prototype.hotKeySpec = function(spec){
    spec.modifiers = spec.modifiers || {};

    return {
        key: function(e) {
            //console.log(e.which);
            return (
                (e.which === spec.key ) &&
                (!!spec.modifiers.ctrl === !!e.ctrlKey) &&
                (!!spec.modifiers.shift === !!e.shiftKey) &&
                (!!spec.modifiers.alt === !!e.altKey) &&
                (!!spec.modifiers.meta === !!e.metaKey)
            );
        },
        handler: spec.handler
    };
};
//
VideoCutterView.prototype.skip = function(change){
    return function(player){
        var newTime = player.currentTime() + (change);
        if (newTime <= 0) {newTime = 0;}
        player.currentTime(newTime);
    };
};

VideoCutterView.prototype.speedChange = function(change){
    return function(player){
        var speed = player.playbackRate() + change;
        speed = speed.toFixed(2);
        if (speed >= 0 && speed <= 50){
            player.playbackRate(speed);
        }
    };
};
/**
 * Disable Loop video
 * @param {Boolean} isPlugin
 * @return {Message}
 */
VideoCutterView.prototype.disableLoop = function (isPlugin) {
    var self = this;
    if(isPlugin) {
        setTimeout(function() {
            videojs.getPlayers()['video'].abLoopPlugin.disable();
        } , 500);
    } else {
        console.warn('Plugin abLoopPlugin not set!');
    }
};
/**
 * Enable Loop video
 * @param {Boolean} isPlugin
 * @param {Number} from
 * @param {Number} to
 * @return {Message}
 */
VideoCutterView.prototype.enableLoop = function (isPlugin, from, to) {
    var self = this;
    if(isPlugin) {
        setTimeout(function() {
            videojs.getPlayers()['video'].abLoopPlugin.setStart(from).setEnd(to).enable();
        } , 500);
    } else {
        console.warn('Plugin abLoopPlugin not set!');
    }
};
/**
 * Get Asset Media
 * @param {Number} media_id
 * @return {Message}
 */
VideoCutterView.prototype.getAssetMedia = function (media_id) {
    var self = this;
    self.baseXHR = $.ajax({
        'url':    self.settings.ajaxLoadAssetsMediaUrl + media_id,
        'method': 'GET',
        'dataType': 'json'
    })
        .done(function (res) {
            if (res.error !== true) {
                console.log('PC: ',res.jwconfig);
            }
        });

};
/**
 * Get EPG Schedule
 * @param {String} date
 * @param {Number} live_linear_id
 * @return {HTML}
 */
VideoCutterView.prototype.getSchedule = function (live_linear_id, date) {
    var self = this;
    self.baseXHR = $.ajax({
        'url':    self.settings.ajaxLoadScheduleUrl,
        'method': 'GET',
        'dataType': 'json',
        data: {
            "live_linear_id":live_linear_id,
            "date":date
        }
    })
        .done(function (res) {
            if(!_.isEmpty(res.data)) {
                var HTML = '';
                $.each(res.data, function(i,v) {
                    HTML += '<option value="'+ v.time +','+ v.duration +'">'+ v.title +'</option>';
                });
                $('#schedule-show').html(HTML);
            }
        });
};
//
VideoCutterView.prototype.getScheduleData = function (selector) {
    var self = this;
    var EPG = {
        'dateTime':null,
        'title':null,
        'duration': null
    };
    var values = self.$scheduleShowField.val();
    var parts = values.split(',');
    EPG.dateTime = parts[0];
    EPG.duration = parts[1];
    EPG.title = $(self.settings.scheduleShowField + ' :selected').text();
    return EPG;
};
//
VideoCutterView.prototype.ResumeLive = function() {
    var self = this;
    self.baseXHR = $.ajax({
        'url': self.params.resumeUrl,
        'method': 'GET',
        'dataType':'json'
    })
        .done(function (res) {
            self.getResumeTime(res.timestamp);
        });
};
