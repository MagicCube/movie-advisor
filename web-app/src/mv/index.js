import $ from "jquery";

$(".ma-subject-list").on("click", "li", e => {
    if (e.target.tagName === "BUTTON")
    {
        const id = e.currentTarget.id;
        const $button = $(e.target);
        if ($button.hasClass("watch"))
        {
            $.ajax({
                url: `/api/subject/${id}/watched`,
                method: "post"
            }).then(result => {
                if (result.successful)
                {
                    $(e.currentTarget).addClass("watched");
                    $button.text("取消").removeClass("watch").addClass("unwatch");
                }
            });
        }
        else
        {
            $.ajax({
                url: `/api/subject/${id}/unwatched`,
                method: "post"
            }).then(result => {
                if (result.successful)
                {
                    $(e.currentTarget).removeClass("watched");
                    $button.text("已看").removeClass("unwatch").addClass("watch");
                }
            });
        }
    }
});
