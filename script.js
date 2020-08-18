(function () {
    var currentPlayer = "player1";

    $(".column").on("click", function (e) {
        //add click handlers to all columns
        var selectedColumn = $(e.currentTarget);
        // e.currentTarget refers to what .on is being called/handled (=column)
        var slotsInColumn = selectedColumn.children();
        // same as selectColumn.find(".slot");

        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                slotsInColumn.eq(i).addClass("row" + i);
                slotsInColumn.eq(i).addClass(currentPlayer);
                //add player piece
                break; //end
            }
        }
        if (checkForColRow(slotsInColumn) == true) {
            functionAlert();
            $(".column").off("click");
            return;
        } else if (checkForColRow($(".row" + i)) == true) {
            functionAlert();
            $(".column").off("click");
            return;
            /*     } else if (checkForDiagonalVictory(slots) == true) {
                    functionAlert();
                    $(".column").off("click");
                    return; */
        } else {
            switchPlayers();
        }

        function switchPlayers() {
            if (currentPlayer == "player1") {
                currentPlayer = "player2";
            } else {
                currentPlayer = "player1";
            }
        }

        //check for victory : loop through all the slots in column and count how many pieces from this player
        function checkForColRow(slots) {
            console.log(slots);
            var count = 0;
            for (var i = 0; i < slots.length; i++) {
                if (slots.eq(i).hasClass(currentPlayer)) {
                    count++;
                }
            }
            if (count >= 4) {
                return true;
            } else {
                return false;
            }
        }

        function functionAlert(msg, myYes) {
            var confirmBox = $("#confirm");
            var msg =
                (currentPlayer == "player1" ? "green" : "mint") +
                " is the winner !";
            confirmBox.find(".message").text(msg);
            confirmBox
                .find(".yes")
                .unbind()
                .click(function () {
                    confirmBox.hide();
                });
            confirmBox.find(".yes").click(myYes);
            if (currentPlayer == "player1") {
                confirmBox.css("background-color", "#a8d8cd");
            } else {
                confirmBox.css("background-color", "#ddefe3");
            }
            confirmBox.show();
        }

        $(".yes").on("click", function (e) {
            location.reload();
        });

        $(".reset").on("click", function (e) {
            location.reload();
        });
    });
})();
