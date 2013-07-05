$(function () {
    var impressEl = $('#impress'),
        frame = $('.frame'),
        steps = $('.step').not('#overview'),
        radius = 2000;

    var increase = Math.PI * 2 / steps.length, angle = 0;
    steps.each(function (i, elem) {
        var x = radius * Math.cos(angle) + radius * 2,
            y = radius * Math.sin(angle) + radius * 2,
            rotation = Math.round(angle / (2 * Math.PI) * 360 - 90);

        $(elem).attr({
            'data-x': x,
            'data-y': y,
            'data-rotate-z': rotation
        })

        angle -= increase;
    })

    function replaceFrame() {
        var computedStyle = window.getComputedStyle(impressEl[0], null),
            matrix = computedStyle.getPropertyValue('transform')
                || computedStyle.getPropertyValue('-moz-transform')
                || computedStyle.getPropertyValue('-webkit-transform')
                || computedStyle.getPropertyValue('-ms-transform')
                || computedStyle.getPropertyValue('-o-transform'),
            data = [1];

        if (matrix != 'none') data = matrix.split('(')[1].split(')')[0].split(',');

        frame.css({
            width: frame.width() * data[0],
            height: frame.height() * data[0]
        })

        frame.css({
            top: Math.max(0, (($(window).height() - frame.outerHeight()) / 2)),
            left: Math.max(0, (($(window).width() - frame.outerWidth()) / 2))
        })
    }

    var images = $('img'), i = 0
    images.on('load', function () {
        i++
        console.log(images.length, i)
    })

    $(window)
        .on('resize', replaceFrame)
        .on('keyup', function (event) {
            if (event.which != 27) return

            window.location = 'index.html'
        })
        .on('impress:step', function () {
            replaceFrame()
        })
        .on('load', function() {
            $('.bg').find('.preload').remove().end().removeClass('loading')
            impress().init();
            replaceFrame()
        });
})
