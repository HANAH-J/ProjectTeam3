package com.reelreview.controller;

import com.reelreview.domain.board.BoardCommentDTO;
import com.reelreview.domain.board.BoardDTO;
import com.reelreview.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/write") //localhost8085/board/write
    public String boardWriteForm() {

        return "boardwrite";
    }

    @PostMapping("/writepro")
    public String boardWritePro(BoardDTO boardDTO, Model model,
                                @RequestParam(value = "title", required = false) String title,
                                @RequestParam(value = "content", required = false) String content,
                                @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            // 파일을 첨부하지 않았을 때도 처리 가능한 로직 작성
            if (title != null) {
                boardDTO.setTitle(title);
            }
            if (content != null) {
                boardDTO.setContent(content);
            }
            if (file != null && !file.isEmpty()) {
                boardService.write(boardDTO, file);
            } else {
                boardService.write(boardDTO, null); // 파일을 첨부하지 않은 경우 null로 처리
            }

            model.addAttribute("message", "글 작성이 완료되었습니다.");
            model.addAttribute("searchUrl", "/api/board/list");
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("message", "글 작성이 실패하였습니다.");
        }
        return "message";
    }

    @GetMapping("/list")
    public ResponseEntity<Page<BoardDTO>> boardList(
            @PageableDefault(page=0, size=5, sort="boardCd", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String searchKeyword) {

        Page<BoardDTO> list = null;

        if (searchKeyword == null||searchKeyword.isEmpty()) {
            list = boardService.boardDTOList(pageable);
        } else {
            list = boardService.boardSearchList(searchKeyword, pageable);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("totalElements", String.valueOf(list.getTotalElements()));
        headers.add("totalPages", String.valueOf(list.getTotalPages()));
        headers.add("currentPage", String.valueOf(list.getNumber()));

        return new ResponseEntity<>(list, headers, HttpStatus.OK);
    }

//    @GetMapping("/view")
//    public String boardView(Model model, Integer boardCd) {
//
//        model.addAttribute("boardDTO", boardService.boardView(boardCd));
//
//        return "boardview";
//
//    }
    @GetMapping("/boardList")
    public BoardDTO boardView(@RequestParam Integer boardCd) {
        BoardDTO b = new BoardDTO();
        BoardDTO board= boardService.boardView(boardCd);
        System.out.println(board);
        return board;

    }

    @GetMapping("/delete")
    public String boardDelete(Integer boardCd, Model model) {
        boardService.boardDelete(boardCd);
        model.addAttribute("message", "글 삭제가 완료되었습니다.");
        model.addAttribute("searchUrl", "/board/list");
        return "message";
    }

    @GetMapping("/modify/{boardCd}")
    public String boardModify(@PathVariable("boardCd") Integer boardCd, Model model) {

        model.addAttribute("boardDTO", boardService.boardView(boardCd));

        return "boardmodify";
    }

    @PostMapping("/update/{boardCd}")
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

    @PostMapping("/addComment")
    public String boardWrite(BoardCommentDTO boardCommentDTO, Model model) throws Exception{

        boardService.writeComment(boardCommentDTO);

        model.addAttribute("message", "글 작성이 완료되었습니다.");
        // model.addAttribute("message", "글 작성이 실패하였습니다.");
        model.addAttribute("searchUrl", "/board/list");

        return "message";
    }
}
