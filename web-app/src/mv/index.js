import $ from "jquery";

$(".ma-subject-list").on("click", "li", e => {
    if (e.target.tagName === "BUTTON")
    {
        const id = e.currentTarget.id;
        const $button = $(e.target);
        if ($button.hasClass("watched"))
        {
            $.ajax({
                url: `/api/subject/${id}/watched`,
                method: "post"
            }).then(result => {
                if (result.successful)
                {
                    $button.text("已看").removeClass("watched").addClass("unwatched");
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
                    $button.text("未看").removeClass("unwatched").addClass("watched");
                }
            });
        }
    }
});
