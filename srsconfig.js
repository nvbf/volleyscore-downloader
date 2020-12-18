const fs = require('fs');

function genConfig(
    match_id_court1, stream_id_court1,
    match_id_court2, stream_id_court2,
    match_id_court3, stream_id_court3,
    match_id_court4, stream_id_court4) 
{
	const conf_str = `
# the config for srs to delivery stream for OSVB, rtmp + ffmpeg

listen              1935;
srs_log_tank        file;
srs_log_file        /root/SRS-CentOS6-x86_64-2.0.258/usr/local/srs/objs/osvb2-srs.log;
pid            /root/SRS-CentOS6-x86_64-2.0.258/usr/local/srs/objs/osvb2.pid;
max_connections     1000;
vhost __defaultVhost__ {
transcode {
	enabled     on;
	ffmpeg      /root/bin/ffmpeg;
	#engine court1 {
#
#	    enabled         on;
#	    vfilter {
#	i /root/volleyscore-downloader/${match_id_court1}.png;
#	filter_complex  'overlay=10:10';
#	f image2;
#	    }
#	    vcodec          libx264;
#	    vthreads        4;
#	    vprofile        main;
#	    vpreset         medium;
#	    vparams {
#	    }
#	    acodec          libfdk_aac;
#	    aparams {
#	    }
#	    output         rtmp://a.rtmp.youtube.com/live2/${stream_id_court1};
#	}
#
#	engine court2 {
#
#	    enabled         on;
#	    vfilter {
#	i /root/volleyscore-downloader/${match_id_court2}.png;
#	filter_complex  'overlay=10:10';
#	f image2;
#	    }
#	    vcodec          libx264;
#	    vthreads        4;
#	    vprofile        main;
#	    vpreset         medium;
#	    vparams {
#	    }
#	    acodec          libfdk_aac;
#	    aparams {
#	    }
#	    output         rtmp://a.rtmp.youtube.com/live2/${stream_id_court2};
#	}
#
#	engine court3 {
#
#	    enabled         on;
#	    vfilter {
#	i /root/volleyscore-downloader/${match_id_court3}.png;
#	filter_complex  'overlay=10:10';
#	f image2;
#	    }
#	    vcodec          libx264;
#	    vthreads        4;
#	    vprofile        main;
#	    vpreset         medium;
#	    vparams {
#	    }
#	    acodec          libfdk_aac;
#	    aparams {
#	    }
#	    output         rtmp://a.rtmp.youtube.com/live2/${stream_id_court3};
#	}

	engine court4 {

	    enabled         on;
	    vfilter {
			loop 1
			f image2;
			i /root/volleyscore-downloader/${match_id_court4}.png;
			filter_complex  'overlay=10:10';
	    }
	    vcodec          libx264;
	    vthreads        4;
	    vprofile        main;
	    vpreset         medium;
	    vparams {
	    }
	    acodec          libfdk_aac;
	    aparams {
	    }
	    output        rtmp://127.0.0.1:[port]/[app]?vhost=[vhost]/[stream]_[engine]; 
	}
    }
}
	`

	fs.writeFileSync(
                "/root/SRS-CentOS6-x86_64-2.0.258/usr/local/srs/conf/osvb2.conf", 
		conf_str, function(err) 
	{

	    if (err) {
		return console.log(err);
	    }
	    console.log("OSVB config file updated");
	}); 
}

module.exports = genConfig
