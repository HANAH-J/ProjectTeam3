package com.reelreview.Controller;

import com.reelreview.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    @Autowired
    private BoardService boardService;
    @RequestMapping("not/no2t")
    public void dkdkjw(){



        boardService.asd();

    }

}
