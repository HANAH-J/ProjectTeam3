package com.reelreview.controller;

import com.reelreview.domain.board.BoardDTO;
import com.reelreview.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/board/write") //localhost8085/board/write
    public String boardWriteForm() {

        return "boardwrite";
    }

    @PostMapping("/board/writepro")
    public String boardWritePro(BoardDTO boardDTO, Model model, MultipartFile file) throws Exception{

        boardService.write(boardDTO, file);

        model.addAttribute("message", "글 작성이 완료되었습니다.");
        // model.addAttribute("message", "글 작성이 실패하였습니다.");
        model.addAttribute("searchUrl", "/board/list");

        return "message";
    }

    @GetMapping("/board/list")
    public String boardList(Model model,
                            @PageableDefault(page=0, size=5, sort="boardCd", direction = Sort.Direction.DESC) Pageable pageable, String searchKeyword) {
                                       //    페이지   페이지당 글  정렬기준컬럼     정렬순서

        Page<BoardDTO> list = null;

        if (searchKeyword == null) {
            list = boardService.boardDTOList(pageable);
        }else {
            list = boardService.boardSearchList(searchKeyword, pageable);
        }

        int nowPage = list.getPageable().getPageNumber() + 1 ;
        int startPage = Math.max(nowPage -4, 1);
        int endPage = Math.min(nowPage +5, list.getTotalPages());

        model.addAttribute("list", list);
        model.addAttribute("nowpage", nowPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        return "boardlist";
    }

    @GetMapping("/board/view")
    public String boardView(Model model, Integer boardCd) {

        model.addAttribute("boardDTO", boardService.boardView(boardCd));

        return "boardview";

    }

    @GetMapping("/board/delete")
    public String boardDelete(Integer boardCd, Model model) {
        boardService.boardDelete(boardCd);
        model.addAttribute("message", "글 삭제가 완료되었습니다.");
        model.addAttribute("searchUrl", "/board/list");
        return "message";
    }

    @GetMapping("/board/modify/{boardCd}")
    public String boardModify(@PathVariable("boardCd") Integer boardCd, Model model) {

        model.addAttribute("boardDTO", boardService.boardView(boardCd));

        return "boardmodify";
    }

    @PostMapping("/board/update/{boardCd}")
    public String boardUpdate(@PathVariable("boardCd") Integer boardCd, BoardDTO boardDTO, Model model, MultipartFile file) throws Exception{

        BoardDTO boardTemp = boardService.boardView(boardCd); //기존에 있던 내용

        boardTemp.setTitle(boardDTO.getTitle()); // 새로입력한 내용 → 기존에 있던 내용에 update
        boardTemp.setWriter(boardDTO.getWriter());
        boardTemp.setContent(boardDTO.getContent());
        boardTemp.setFilename(boardDTO.getFilename());
        boardTemp.setFilepath(boardDTO.getFilepath());

        boardService.write(boardTemp, file);

        model.addAttribute("message","수정이 완료되었습니다");
        model.addAttribute("searchUrl","/board/list");

        return "message";
    }
}
