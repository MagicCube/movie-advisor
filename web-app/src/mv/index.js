import $ from "jquery";

$(".ma-movie-list").on("click", "li", e => {
    if (e.target.tagName === "BUTTON")
    {
        const id = e.currentTarget.id;
        const $button = $(e.target);
        if ($button.text() === "已看")
        {
            $.ajax({
                url: `/api/movie/${id}/watched`,
                method: "post"
            }).then(result => {
                if (result.successful)
                {
                    $button.text("取消").removeClass("watched").addClass("unwatched");
                }
            });
        }
        else
        {
            $.ajax({
                url: `/api/movie/${id}/unwatched`,
                method: "post"
            }).then(result => {
                if (result.successful)
                {
                    $button.text("已看").removeClass("unwatched").addClass("watched");
                }
            });
        }
    }
});